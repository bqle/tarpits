// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, runTransaction, ref, set } from "firebase/database";
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
function counterOperation(func: any): Promise<boolean> {
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
        return true;
      } else {
        console.log("Transaction not committed");
        return false;
      }
    })
    .catch((error) => {
      console.error("Transaction failed:", error);
      return false;
    });
}

function postTarpit(content: PostI): Promise<boolean> {
  const postWithId = (value: number) => {
    set(ref(db, `users/post/${value}`), content);
  };
  return counterOperation(postWithId);
}

const setExample = () => {
  set(ref(db, "users/bqle"), {
    username: "hello!",
    email: "bqle@seas.upenn.edu",
  });
};

export { app, setExample, postTarpit };
