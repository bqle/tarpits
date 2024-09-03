import Image from "next/image";
import Link from "next/link";
import styles from "./viewpost.module.css";

const StatusColumn = () => {
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
      <p className={styles.form_answer}>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis
        <br />
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis
      </p>
    </div>
  );
};

const TarpitForm = (params: ViewPostI) => {
  const { id } = params;
  return (
    <div className={styles.form}>
      {/* Header */}
      <div className={styles.form_header}>
        <div className={styles.flex_baseline}>
          <p>#{id}: </p>
          <h1>Digitalized Gravestone</h1>
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
      <p>US</p>
      <p>2025</p>
      <p>bqle@seas.upenn.edu</p>
      <Image src="/copy-link.png" alt="Send" width={25} height={25} priority />
    </div>
  );
};

interface ViewPostI {
  id: string;
}
export default function ViewPost({ params }) {
  const { id } = params;

  return (
    <main className={styles.container}>
      <StatusColumn />
      <TarpitForm id={id} />
      <SubmitForm />
    </main>
  );
}
