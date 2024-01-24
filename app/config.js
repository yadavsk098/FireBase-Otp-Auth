// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyATOofDlv1en_1kw0EmZe2fHsdwOYKL9hw",
  authDomain: "authapp-e8cda.firebaseapp.com",
  projectId: "authapp-e8cda",
  storageBucket: "authapp-e8cda.appspot.com",
  messagingSenderId: "971636254062",
  appId: "1:971636254062:web:716a867e453956f2ff8d7f",
  measurementId: "G-MB2VMGQ015"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};