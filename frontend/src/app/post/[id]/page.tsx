"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./viewpost.module.css";
import { useState, useEffect } from "react";
import { getTarpit } from "@/utils/firebase";
import type { PostI } from "../../../utils/schema";

const LogoColumn = () => {
  return (
    <div className={styles.status_column}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Image src="/logo.png" alt="logo" width={100} height={100} priority />
        <p className={styles.logo_title}>Tarpits</p>
      </Link>
    </div>
  );
};

interface FormRowI {
  question: string;
  points: Array<string>;
  answer: string;
}

const FormRow = ({ question, points, answer }: FormRowI) => {
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
      <p className={styles.form_answer}>{answer}</p>
    </div>
  );
};

interface TarpitFormI {
  id: string;
  title: string;
  answers: Array<string>;
}
const TarpitForm = ({ id, title, answers }: TarpitFormI) => {
  return (
    <div className={styles.form}>
      {/* Header */}
      <div className={styles.form_header}>
        <div className={styles.flex_baseline}>
          <p>#{id}: </p>
          <h1>{title}</h1>
        </div>
      </div>
      {/* Row questions */}
      <FormRow
        question="Who were your cofounders?"
        points={[
          "Individual experience",
          "Team experience",
          "Key partnerships",
        ]}
        answer={answers[0] ?? ""}
      />
      <FormRow
        question="What was your idea?"
        points={[
          "Product / service",
          "Target market",
          "Growth potential",
          "Unit economics",
        ]}
        answer={answers[1] ?? ""}
      />
      <FormRow
        question="What was the surrounding business environment?"
        points={[
          "Regulatory environment",
          "Consumer trends",
          "Any relevant factors outside your control",
        ]}
        answer={answers[2] ?? ""}
      />
      <FormRow
        question="What is your party story?"
        points={[
          "Key milestones",
          "Vital moments for the team",
          "When did you consider quitting?",
        ]}
        answer={answers[3] ?? ""}
      />
      <FormRow
        question="What lessons would you pass on to future founders?"
        points={[
          "Be as specific about your industry and case as possible",
          "Actions that could have been taken",
          "Decisions that would have been made differently",
        ]}
        answer={answers[3] ?? ""}
      />
    </div>
  );
};

interface ActionFormI {
  year: string;
  email: string;
}

const ActionForm = ({ year, email }: ActionFormI) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleCopy: any = (e: MouseEvent) => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        const x = e.clientX;
        const y = e.clientY;
        setPopupPosition({ x, y });

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 300);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className={styles.submit_form}>
      <p>{year}</p>
      <p>{email}</p>
      <Image
        onClick={handleCopy}
        src="/copy-link.png"
        alt="Copy"
        width={25}
        height={25}
        priority
      />
      {showPopup && (
        <div
          className={styles.button_popup}
          style={{
            top: `${popupPosition.y}px`,
            left: `${popupPosition.x}px`,
          }}
        >
          Saved link to clipboard
        </div>
      )}
    </div>
  );
};

interface ViewPostI {
  id: string;
}

enum LoadingState {
  LOADING = 0,
  SUCCESS = 1,
  ERROR = -1,
}

export default function ViewPost({ params }: { params: ViewPostI }) {
  const { id } = params;
  const [loadingState, setLoadingState] = useState(LoadingState.LOADING);
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState([] as Array<string>);

  useEffect(() => {
    const idNumber: number = parseInt(id);
    if (!idNumber) {
      setLoadingState(LoadingState.ERROR);
      return;
    }

    getTarpit(idNumber).then((content: PostI | null) => {
      if (!content || !content.answers) {
        setLoadingState(LoadingState.ERROR);
        return;
      }

      setYear(content.year ? String(content.year) : "");
      setEmail(content.email ?? "");
      setTitle(content.title ?? "");
      setAnswers(content.answers);
      setLoadingState(LoadingState.SUCCESS);
    });
  }, []);

  return (
    <main className={styles.container}>
      <LogoColumn />
      {loadingState === LoadingState.SUCCESS && (
        <TarpitForm id={id} title={title} answers={answers} />
      )}
      {loadingState === LoadingState.SUCCESS && (
        <ActionForm year={year} email={email} />
      )}
      {loadingState === LoadingState.ERROR && (
        <div>
          <h3>Sorry! Some error occurred</h3>
          <h3>&lt;------</h3>
        </div>
      )}
    </main>
  );
}
