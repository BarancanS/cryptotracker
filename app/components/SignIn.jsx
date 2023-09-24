"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  logout,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie"; // Make sure to install js-cookie

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Remember Me checkbox state
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Check if the user is remembered and automatically log them in
    const rememberedUser = Cookies.get("rememberedUser");
    if (rememberedUser === "true" && !user) {
      // Perform automatic login here
      // You can use the logInWithEmailAndPassword function here
      // Make sure to handle errors appropriately
      const rememberedEmail = Cookies.get("rememberedEmail");
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        handleLogin();
      }
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
      if (rememberMe) {
        Cookies.set("rememberedUser", "true", { expires: 365 }); // Remember the user for 1 year
        Cookies.set("rememberedEmail", email, { expires: 365 });
      } else {
        Cookies.remove("rememberedUser");
        Cookies.remove("rememberedEmail");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center rounded-xl">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">
          Sign In
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember Me
              </label>
            </div>
            <button
              type="button"
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={() => sendPasswordReset(email)}
            >
              Reset Password
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              onClick={signInWithGoogle}
            >
              Sign In with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
