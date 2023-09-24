"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../shared/firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-semibold text-center mb-6 text-black">
        Register
      </h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="mr-2 form-checkbox text-blue-400"
          />
          <label htmlFor="agreeToTerms" className="text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          onClick={register}
        >
          Register
        </button>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
        >
          <span className="text-xl mr-2">
            <FcGoogle />
          </span>
          Register With Google
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
