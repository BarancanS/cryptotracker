"use client";
import React from "react";
import { useState, useEffect } from "react";
import { CoinList } from "../../app/config/api";
import { CryptoState } from "../CryptoContext";
import Link from "next/link";
import Image from "next/image";
import jsonData from "../datas.json";

const Table = () => {
  const { currency, setCurrency, symbol } = CryptoState();
  const [coinsList, setCoinsList] = useState(jsonData);
  useEffect(() => {
    // getTrendsApi();
  }, []);
  //   const getTrendsApi = async () => {
  //     return fetch(CoinList(currency))
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setCoinsList(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-5">
      <h1 className="text-4xl">Cryptocurrency Prices by Market Cap</h1>
      <input
        type="text"
        placeholder="Search For a Crypto Currency"
        className="bg-transparent w-10/12 h-10"
      />
      <table className="w-full">
        <thead>
          <tr className="bg-[#FFD700]">
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        {coinsList.map((items, index) => {
          return (
            <tbody>
              <tr>
                <th className="text-center">
                  <Image width={100} height={100} src={items.image}></Image>
                </th>
                <td className="text-center">{items.name}</td>
                <td className="text-center">asd</td>
                <td className="text-center">asd</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
