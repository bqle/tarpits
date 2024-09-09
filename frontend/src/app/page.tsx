"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getRecentTarpits } from "@/utils/firebase";
import { PostI } from "@/utils/schema";

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
      <input type="text" placeholder="Search for tarpit"></input>
    </div>
  );
};

interface PostPreviewI {
  id: number;
  title: string;
  year: number;
  desc: string;
}

const PostPreview = ({ id, title, year, desc }: PostPreviewI) => {
  return (
    <li className={styles.result}>
      <Link href={`/post/${id}`}>
        <div className={styles.result_header}>
          <div className={styles.flex_baseline}>
            <p style={{ marginRight: "5px" }}>Tarpit #{id}:</p>
            <h3>{title}</h3>
          </div>
          <div className={styles.flex_baseline} style={{ marginRight: "10px" }}>
            <Image
              src="/calendar.png"
              width={14}
              height={14}
              alt="pin"
              priority
              style={{ marginRight: "5px" }}
            />
            <p>{year}</p>
          </div>
        </div>
        <div className={styles.result_desc}>
          <p> {desc.repeat(1000)}</p>
        </div>
      </Link>
    </li>
  );
};

const SearchResultList = () => {
  const [previews, setPreviews] = useState([] as Array<PostI>);

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const response = await getRecentTarpits();
        setPreviews(Object.values(response).reverse() as Array<PostI>);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPreviews();
  }, []);

  return (
    <div className={styles.search_list}>
      <ul>
        {previews &&
          previews.map((preview, index) => (
            <PostPreview
              key={preview.id}
              id={preview.id ?? -1}
              title={preview.title ?? ""}
              year={preview.year ?? 0}
              desc={preview.answers[0] ?? ""}
            />
          ))}
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

const Intro = () => {
  return (
    <div className={styles.info_container}>
      <Link href="/">
        <Image
          width={150}
          height={150}
          src="/logo.png"
          alt="Tarpits logo"
          priority
        />
      </Link>
      <p className={styles.logo_title}>Tarpits</p>
      <div className={styles.info_desc}>
        <p style={{ margin: "0px" }}>
          Tarpits are ideas that on the surface seem like fantastic
          opportunities but is actually a trap for entrepreneurs. Many flock to
          them because they're appealing on the surface. However, often getting
          stuck in them, wasting precious resources and time.
          <br />
          <br />
          We&apos;re collecting stories of tarpits you encountered on your
          business journeys. We&apos;d love to hear the ups and downs, why the
          idea attracted you in the first place, and why you think this was a
          tarpit.
        </p>
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link href="/post/create">
        <Image src="/writing.png" height={20} width={20} alt="Add" priority />
      </Link>
    </div>
  );
};
export default function Home() {
  return (
    <main className={styles.container}>
      <Intro />
      <Search />
      <Menu />
    </main>
  );
}
