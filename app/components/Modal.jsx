"use client";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { auth } from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthModal = ({ onClose }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  const toggleAuthMode = () => {
    setShowSignIn((prev) => !prev);
  };

  // If the user is authenticated, do not render the modal
  if (user) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 transition-all ease-in-out duration-500">
      <div className="p-6 rounded-lg shadow-md relative w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {showSignIn ? "Sign In" : "Sign Up"}
        </h1>{" "}
        <button
          className="text-gray-500 absolute right-0 top-10 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
        {showSignIn ? <SignIn /> : <SignUp />}
        <div className="text-center mt-4">
          <p>
            {showSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={toggleAuthMode}
            >
              {showSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
