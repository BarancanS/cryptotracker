"use client";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { CryptoState } from "../CryptoContext";
import Link from "next/link";

const Navbar = () => {
  const { currency, setCurrency, symbol } = CryptoState();

  return (
    <section className="w-10/12 h-16 flex flex-row items-center justify-between mx-auto ">
      <Link
        href="/"
        className="text-[#FFD700] font-extrabold text-2xl  max-md:text-base"
      >
        Crypto Tracker
      </Link>
      <ul className="flex flex-row gap-4">
        <li>
          <select
            name=""
            id=""
            className="w-24 max-sm:w-14 bg-[#14161a] text-white  h-10 rounded-md"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
          </select>
        </li>
        <li>
          <button className="w-24 max-sm:w-14 bg-[#FFD700] h-10 rounded-md text-black">
            LOGIN
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
