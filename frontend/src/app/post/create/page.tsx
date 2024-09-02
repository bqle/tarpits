import Image from "next/image";
import styles from "./createpost.module.css";

const StatusColumn = () => {
  return (
    <div className={styles.status_column}>
      <Image src="/logo.png" alt="logo" width={100} height={100} priority />
      <p>Saved</p>
    </div>
  );
};

interface FormRowI {
  question: string;
  points: Array<string>;
}

const FormRow = ({ question, points }: FormRowI) => {
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
      <textarea className={styles.form_answer} placeholder="Your thoughts" />
    </div>
  );
};

const TarpitForm = () => {
  return (
    <div className={styles.form}>
      {/* Header */}
      <div className={styles.form_header}>
        <div className={styles.flex_baseline}>
          <input placeholder="Tarpit name..." />
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
      />
      <FormRow
        question="What was your idea?"
        points={[
          "Product / service",
          "Target market",
          "Growth potential",
          "Unit economics",
        ]}
      />
      <FormRow
        question="What was the surrounding business environment?"
        points={[
          "Regulatory environment",
          "Consumer trends",
          "Any relevant factors outside your control",
        ]}
      />
      <FormRow
        question="What is your party story?"
        points={[
          "Key milestones",
          "Vital moments for the team",
          "When did you consider quitting?",
        ]}
      />
      <FormRow
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

const SubmitForm = () => {
  return (
    <div className={styles.submit_form}>
      <input placeholder="Country..." />
      <input placeholder="Year..." />
      <input placeholder="Email..." />
      <Image
        src="/paper-airplane.png"
        alt="Send"
        width={30}
        height={30}
        priority
      />
      <p>Post</p>
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
