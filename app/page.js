"use client";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Banner from "../app/components/Header/Banner";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {
  auth,
  logout,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  const handleStatusChange = () => {
    setStatus(!status);
  };
  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          Loading..
        </div>
      ) : (
        <div>
          <main className="w-full min-h-screen">
            <Navbar />
            <Banner />
            <Table />
          </main>
        </div>
      )}
    </div>
  );
}
