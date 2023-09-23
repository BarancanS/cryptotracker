"use client";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { CryptoState } from "../CryptoContext";
import Link from "next/link";
import SignIn from "./SignIn";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {
  const { currency, setCurrency, symbol } = CryptoState();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);
  return (
    <section className="w-10/12 h-16 flex flex-row items-center justify-between mx-auto ">
      <Link
        href="/"
        className="text-[#FFD700] font-extrabold text-2xl  max-md:text-base"
      >
        Crypto Tracker
      </Link>
      <ul className="flex flex-row gap-4">
        <li className="flex flex-col items-center justify-center">
          <select
            name=""
            id=""
            className="w-24 max-sm:w-14 bg-[#14161a] text-white h-10 rounded-md"
            onChange={(e) => setCurrency(e.target.value)}
            value={currency}
          >
            <option value="usd">USD</option>
            <option value="try">TRY</option>
          </select>
        </li>
        <li>
          <SignIn />
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
