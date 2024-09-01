import Image from "next/image";
import styles from "./page.module.css";

const SearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <Image
        width={20}
        height={20}
        src="/search-icon.png"
        alt="Search icon"
        priority
      />
    </div>
  );
};

const Result = () => {
  return (
    <div className={styles.search_result}>
      <div className={styles.result_header}>
        <div className={styles.flex_baseline}>
          <p style={{ marginRight: "5px" }}>Tarpit #123:</p>
          <h3>Digitalized Nameplate</h3>
        </div>
        <div className={styles.flex_baseline}>
          <Image
            src="/geopin-black.png"
            width={14}
            height={14}
            alt="pin"
            priority
            style={{ marginRight: "5px" }}
          />
          <p>Minnesota, USA</p>
        </div>
      </div>
      <div className={styles.result_desc}>
        <p>
          Who wouldn’t want to store the memories of their loved ones? We build
          a website for people to create books about their loved ones’ stories
        </p>
      </div>
    </div>
  );
};

const SearchResultList = () => {
  return (
    <div className={styles.search_list}>
      <ul>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
      </ul>
    </div>
  );
};

const Search = () => {
  return (
    <div className={styles.search_container}>
      <SearchBar />
      <SearchResultList />
    </div>
  );
};

const Info = () => {
  return (
    <div className={styles.info_container}>
      <Image
        width={150}
        height={150}
        src="/logo.png"
        alt="Tarpits logo"
        priority
      />
      <p className={styles.logo_title}>Tarpits</p>
      <p className={styles.info_desc}>
        Tarpits are ideas that on the surface seem like fantastic opportunities
        but is actually a trap for entrepreneurs. Many flock to them for its
        appealing odor, often getting trapped in it, wasting precious resources
        and time.
        <br />
        <br />
        We’re collecting stories of tarpits you encountered on your business
        journeys. We’d love to hear the ups and downs, why the idea attracted
        you in the first place, and why you think this was a tarpit.
      </p>
    </div>
  );
};
export default function Home() {
  return (
    <main className={styles.container}>
      <Info />
      <Search />
    </main>
  );
}
