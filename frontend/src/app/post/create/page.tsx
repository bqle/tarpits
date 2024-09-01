import Image from "next/image";
import styles from "./createpost.module.css";

const StatusColumn = () => {
  return (
    <div className={styles.status_column}>
      <Image src="/logo.png" alt="logo" width={100} height={100} priority />
      <p>Saving...</p>
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
    </div>
  );
};

export default function CreatePost() {
  return (
    <main className={styles.container}>
      <StatusColumn />
      <TarpitForm />
    </main>
  );
}
