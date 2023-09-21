import Image from "next/image";
import React from "react";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Banner from "../app/components/Header/Banner";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <Banner />
      <Table />
    </main>
  );
}
