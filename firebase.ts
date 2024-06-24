import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBsi-VIdr5GQ9K6h6_MLdP6h_bVlllEmAg",
  authDomain: "uas-iot-54a67.firebaseapp.com",
  databaseURL:
    "https://uas-iot-54a67-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uas-iot-54a67",
  storageBucket: "uas-iot-54a67.appspot.com",
  messagingSenderId: "1036214718869",
  appId: "1:1036214718869:web:3c41b343631bc10b94a69c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
