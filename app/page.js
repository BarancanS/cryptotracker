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
          {user ? (
            <main className="w-full min-h-screen">
              <Navbar />
              <Banner />
              <Table />
            </main>
          ) : (
            <div>
              {status ? (
                <div
                  className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${`/pexels-james-wheeler-1519088.jpg`}")`,
                  }}
                >
                  <SignIn />
                  <button
                    onClick={handleStatusChange}
                    className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
                  >
                    Register Page
                  </button>
                </div>
              ) : (
                <div
                  className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${`/pexels-piccinng-3075993.jpg`}")`,
                  }}
                >
                  <SignUp />
                  <button
                    onClick={handleStatusChange}
                    className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
                  >
                    Login Page
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
