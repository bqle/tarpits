"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./createpost.module.css";
import React, { useRef, useEffect, useState } from "react";

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
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef: any = useRef(null);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; textareaValue${id}=`);
    const savedValue = parts.pop()?.split(";").shift();
    if (savedValue) {
      setTextareaValue(savedValue);
    }
  }, []);

  function handleBlur() {
    document.cookie = `textareaValue${id}=${textareaValue}; path=/`;
  }

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
      <textarea
        ref={textareaRef}
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        onBlur={handleBlur}
        className={styles.form_answer}
        placeholder="Your thoughts"
      />
    </div>
  );
};

const TarpitForm = () => {
  return (
    <div className={styles.form}>
      {/* Header */}
      <div className={styles.form_header}>
        <p>Write about your own tarpit encounter: </p>
        <input placeholder="Tarpit name..." />
      </div>
      {/* Row questions */}
      <FormRow
        id={1}
        question="Who were your cofounders?"
        points={[
          "Individual experience",
          "Team experience",
          "Key partnerships",
        ]}
      />
      <FormRow
        id={2}
        question="What was your idea?"
        points={[
          "Product / service",
          "Target market",
          "Growth potential",
          "Unit economics",
        ]}
      />
      <FormRow
        id={3}
        question="What was the surrounding business environment?"
        points={[
          "Regulatory environment",
          "Consumer trends",
          "Any relevant factors outside your control",
        ]}
      />
      <FormRow
        id={4}
        question="What is your party story?"
        points={[
          "Key milestones",
          "Vital moments for the team",
          "When did you consider quitting?",
        ]}
      />
      <FormRow
        id={5}
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

const SubmitForm = () => {
  const [submitErrs, setSubmitErrs] = useState(Array<string>());

  const handleSubmit: any = (e: MouseEvent) => {
    let yearValue = (document.getElementById("year") as HTMLInputElement).value;
    let emailValue = (document.getElementById("email") as HTMLInputElement)
      .value;

    let errs: Array<string> = [];
    if (yearValue != "") {
      let yearNumber = parseInt(yearValue, 10);
      if (!yearNumber) {
        errs.push("Year is not an integer");
      }
      if (yearNumber < 1900 || yearNumber > 2024) {
        errs.push("Make sure year is in a close range");
      }
    }
    if (emailValue != "") {
      if (!isValidEmail(emailValue)) {
        errs.push("Invalid email address");
      }
    }

    setSubmitErrs(errs);
    if (errs.length == 0) {
      // Submit
      console.log("submit");
    }
  };

  return (
    <div className={styles.submit_form}>
      <input id="year" placeholder="Year..." />
      <input id="email" placeholder="Email..." />
      <div onClick={handleSubmit}>
        <Image
          src="/paper-airplane.png"
          alt="Send"
          width={30}
          height={30}
          priority
        />
        <p>Post</p>
        {submitErrs.length > 0 &&
          submitErrs.map((errStr, index) => (
            <li className={styles.errorStr} key={index}>
              {errStr}
            </li>
          ))}
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
