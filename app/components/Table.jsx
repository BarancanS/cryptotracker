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
      <table className="w-10/12 bg-[#16171A]">
        <thead>
          <tr className="bg-[#FFD700] h-16">
            <th className="text-black">Coin</th>
            <th className="text-black">Price</th>
            <th className="text-black">24h Change</th>
            <th className="text-black">Market Cap</th>
          </tr>
        </thead>
        {coinsList.map((items, index) => {
          return (
            <tbody>
              <tr className="hover:bg-black border-b">
                <th className="flex items-center justify-center p-2">
                  <Image width={100} height={100} src={items.image}></Image>
                </th>
                <td className="text-center p-2">{items.name}</td>
                <td className="text-center p-2">
                  {items.market_cap_change_percentage_24h}
                </td>
                <td className="text-center p-2">{items.market_cap}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
