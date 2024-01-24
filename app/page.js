"use client"
import Login from "./login"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { app } from './config'

// here we will write code for user auth statechange 
export default function Home() {


  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('./dashboard');
      }
    })
  }, [auth, router]);


  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-10">Firebase OTP Sign-In</h1>
      <Login />
    </main>
  );
}
