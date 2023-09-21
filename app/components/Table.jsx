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
  const [loadMore, setLoadMore] = useState(10);

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
        {coinsList.slice(0, loadMore).map((items, index) => {
          return (
            <tbody>
              <tr className="hover:bg-black border-b">
                <th className="flex items-center justify-center p-2">
                  <Image width={100} height={100} src={items.image}></Image>
                </th>
                <td className="text-center p-2">{items.name}</td>
                <td className="text-center p-2">
                  {items.market_cap_change_percentage_24h
                    ?.toString()
                    .substring(0, 5)}
                  %
                </td>
                <td className="text-center p-2">
                  $ {items.market_cap?.toString().substring(0, 3)},
                  {items.market_cap?.toString().substring(3, 6)}M
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="flex flex-row w-10/12 items-center justify-center mt-5 gap-3 mb-5">
        <button
          onClick={() => setLoadMore(loadMore + 10)}
          className="w-24 max-sm:w-14 bg-[#FFD700] h-10 rounded-md text-black"
        >
          Show More
        </button>
        {loadMore > 10 && (
          <button
            onClick={() => setLoadMore(loadMore - 10)}
            className="w-24 max-sm:w-14 bg-[#FFD700] h-10 rounded-md text-black"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
