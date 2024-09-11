"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./createpost.module.css";
import React, { useState } from "react";
import { CounterOpResult, postTarpit } from "../../../utils/firebase";
import { CookieSaver } from "@/components/CookieSaver";
import { useRouter } from "next/navigation";

function getAnswerElementId(id: number) {
  return `answer-${id}`;
}

const StatusColumn = () => {
  return (
    <div className={styles.status_column}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Image src="/logo.png" alt="logo" width={100} height={100} priority />
        <p className={styles.logo_title}>Tarpits</p>
      </Link>
      <p className={styles.save_status}>Autosaved.</p>
    </div>
  );
};

interface FormRowI {
  id: number;
  question: string;
  points: Array<string>;
}

const FormRow = ({ id, question, points }: FormRowI) => {
  const textareaId = getAnswerElementId(id);

  return (
    <div className={styles.form_row}>
      <div className={styles.form_question}>
        <h3>{question}</h3>
        <ul>
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <CookieSaver elementId={textareaId}>
        <textarea className={styles.form_answer} placeholder="Your thoughts" />
      </CookieSaver>
    </div>
  );
};

const NUMBER_OF_QUESTIONS = 5;
const TarpitForm = () => {
  return (
    <div className={styles.form}>
      {/* Header */}
      <div className={styles.form_header}>
        <p>Write about your own tarpit encounter: </p>
        <CookieSaver elementId="post-title">
          <input placeholder="Tarpit name..." />
        </CookieSaver>
      </div>
      {/* Row questions */}
      <FormRow
        id={0}
        question="Who were your cofounders?"
        points={[
          "Individual experience",
          "Team experience",
          "Key partnerships",
        ]}
      />
      <FormRow
        id={1}
        question="What was your idea?"
        points={[
          "Product / service",
          "Target market",
          "Growth potential",
          "Unit economics",
        ]}
      />
      <FormRow
        id={2}
        question="What was the surrounding business environment?"
        points={[
          "Regulatory environment",
          "Consumer trends",
          "Any relevant factors outside your control",
        ]}
      />
      <FormRow
        id={3}
        question="What was a key moment in the life of your company?"
        points={[
          "Milestone achievements",
          "Vital moments for the team",
          "When did you consider quitting?",
        ]}
      />
      <FormRow
        id={4}
        question="What lessons would you pass on to future founders?"
        points={[
          "Be as specific about your industry and case as possible",
          "Actions that could have been taken",
          "Decisions that would have been made differently",
        ]}
      />
    </div>
  );
};

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getAnswers() {
  let answers: Array<string> = [];
  for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
    let textareaValue = (
      document.getElementById(getAnswerElementId(i)) as HTMLTextAreaElement
    ).value;
    answers.push(textareaValue);
  }
  return answers;
}

function clearPostCookies() {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const [cookieName] = cookie.split("=");
    const trimmedCookieName = cookieName.trim();

    if (
      trimmedCookieName === "post-title" ||
      trimmedCookieName === "year" ||
      trimmedCookieName === "email" ||
      trimmedCookieName.startsWith("answer-")
    ) {
      document.cookie = `${trimmedCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
}

const SubmitForm = () => {
  const router = useRouter();
  const [submitErrs, setSubmitErrs] = useState(Array<string>());
  const [successfulPost, setSuccessfulPost] = useState(false);

  const handleSubmit: any = (e: MouseEvent) => {
    let title = (document.getElementById("post-title") as HTMLInputElement)
      .value;
    let yearValue = (document.getElementById("year") as HTMLInputElement).value;
    let emailValue = (document.getElementById("email") as HTMLInputElement)
      .value;

    let errs: Array<string> = [];
    let yearNumber = null;
    if (!title) {
      errs.push("Add a none-empty title");
    }

    if (yearValue) {
      yearNumber = parseInt(yearValue, 10);
      if (!yearNumber) {
        errs.push("Year is not an integer");
      }
      if (yearNumber < 1900 || yearNumber > 2024) {
        errs.push("Make sure year is in a close range (1900-2024)");
      }
    } else {
      errs.push("Please note the year that you saw the tarpit");
    }
    if (emailValue) {
      if (!isValidEmail(emailValue)) {
        errs.push("Invalid email address");
      }
    }

    setSubmitErrs(errs);
    if (errs.length == 0) {
      postTarpit({
        id: null,
        title: title,
        year: yearNumber,
        email: emailValue,
        answers: getAnswers(),
      }).then((counterOpResult: CounterOpResult) => {
        if (counterOpResult.success) {
          clearPostCookies();
          setSuccessfulPost(true);
          setTimeout(() => {
            router.push(`/post/${counterOpResult.postId!}`);
          }, 1000);
        } else {
          alert("Unsuccessful post");
        }
      });
    }
  };

  return (
    <div className={styles.submit_form}>
      <CookieSaver elementId="year">
        <input placeholder="Year..." />
      </CookieSaver>
      <CookieSaver elementId="email">
        <input placeholder="Email..." />
      </CookieSaver>
      <div onClick={handleSubmit}>
        <Image
          src="/paper-airplane.png"
          alt="Send"
          width={30}
          height={30}
          priority
        />
        <p className={styles.post_button}>Post</p>
        {submitErrs.length > 0 &&
          submitErrs.map((errStr, index) => (
            <li className={styles.error_status} key={index}>
              {errStr}
            </li>
          ))}
        {successfulPost && (
          <p className={styles.success_status}>
            Successfully saved your post. You will be redirected momentarily
          </p>
        )}
      </div>
    </div>
  );
};

export default function CreatePost() {
  return (
    <main className={styles.container}>
      <StatusColumn />
      <TarpitForm />
      <SubmitForm />
    </main>
  );
}
