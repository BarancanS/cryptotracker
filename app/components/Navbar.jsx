"use client";
import React, { useState } from "react";
import { CryptoState } from "../CryptoContext";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Modal from "./Modal";

const Navbar = () => {
  const { currency, setCurrency } = CryptoState();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="w-10/12 h-16 flex flex-row items-center justify-between mx-auto">
      <Link
        href="/"
        className="text-[#FFD700] font-extrabold text-2xl max-md:text-base"
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

        {user ? (
          <ul className="flex flex-row items-center justify-center gap-4">
            <li>
              <button
                className="bg-red-500 text-white w-24 max-sm:w-14 h-10 rounded-md"
                onClick={() => auth.signOut()}
              >
                Logout
              </button>
            </li>
            <li>
              <button className="bg-[#FFD700] text-black w-24 max-sm:w-14 h-10 rounded-md">
                <Link href="/profile">Profile</Link>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-row gap-4">
            <li>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={openModal}
              >
                Login
              </button>
            </li>
          </ul>
        )}
      </ul>
      {showModal && <Modal onClose={closeModal} />}
    </section>
  );
};

export default Navbar;
