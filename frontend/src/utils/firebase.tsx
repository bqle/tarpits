// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  runTransaction,
  ref,
  get,
  set,
  child,
  orderByChild,
  query,
  limitToLast,
  startAfter,
} from "firebase/database";
import type { PostI } from "./schema";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYeaAePNtAfe_y32orMMJIa4XlSq9GHeA",
  authDomain: "tarpits-c22e1.firebaseapp.com",
  projectId: "tarpits-c22e1",
  storageBucket: "tarpits-c22e1.appspot.com",
  messagingSenderId: "968609843120",
  appId: "1:968609843120:web:4b8b4b43d4f1071095b875",
  measurementId: "G-TVB97PK152",
  databaseUrl: "https://tarpits-c22e1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface CounterOpResult {
  success: boolean;
  postId?: number;
}
function counterOperation(func: any): Promise<CounterOpResult> {
  const counterRef = ref(db, "counter");
  return runTransaction(counterRef, (currentValue) => {
    if (currentValue === null) {
      return 1;
    }
    return currentValue + 1;
  })
    .then((result) => {
      if (result.committed) {
        console.log("Transaction committed:", result.snapshot.val());
        func(result.snapshot.val());
        return { success: true, postId: result.snapshot.val() };
      } else {
        console.log("Transaction not committed");
        return { success: false };
      }
    })
    .catch((error) => {
      console.error("Transaction failed:", error);
      return { success: false };
    });
}

function postTarpit(content: PostI): Promise<CounterOpResult> {
  const postWithId = (postId: number) => {
    content.id = postId;
    set(ref(db, `users/post/${postId}`), content);
  };
  return counterOperation(postWithId);
}

function getTarpit(postId: number): Promise<PostI | null> {
  const path = `users/post/${postId}`;
  const dbRef = ref(db);
  return get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Data:", snapshot.val());
        return snapshot.val(); // Returns the data at the specified path
      } else {
        console.log("No data available at this path.");
        return null;
      }
    })
    .catch((error) => {
      return null;
    });
}

async function getRecentTarpits(sinceExclusive: number = -1) {
  const itemsRef = ref(db, "users/post");
  const topItemsQuery = query(
    itemsRef,
    orderByChild("id"),
    startAfter(null),
    limitToLast(10)
  );

  const snapshot = await get(topItemsQuery);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  } else {
    return [];
  }
}

export { app, postTarpit, getTarpit, getRecentTarpits };
export type { CounterOpResult };
