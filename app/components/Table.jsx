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
  // const [coinsList, setCoinsList] = useState([]);
  const [loadMore, setLoadMore] = useState(10);

  // useEffect(() => {
  //   getTrendsApi();
  // }, []);
  // const getTrendsApi = async () => {
  //   return fetch(CoinList(currency))
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCoinsList(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-5">
      <h1 className="text-4xl mb-4">Cryptocurrency Prices by Market Cap</h1>
      <input
        type="text"
        placeholder="Search For a Crypto Currency"
        className="w-10/12 h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-400"
      />
      <table className="w-10/12 mt-5 bg-[#1E1E1E] text-white max-md:text-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#FFD700] h-16">
            <th className="text-black p-2">Coin</th>
            <th className="text-black p-2">Price</th>
            <th className="text-black p-2">24h Change</th>
            <th className="text-black p-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coinsList.slice(0, loadMore).map((items, index) => {
            const isNegativeChange = items.market_cap_change_percentage_24h < 0;

            return (
              <tr
                key={items.id}
                className="hover:bg-gray-800 border-b border-gray-600"
              >
                <td className="flex items-center p-2">
                  <Link
                    href={`/coins/${items.id}`}
                    className="w-full flex flex-row items-center"
                  >
                    <Image
                      width={40}
                      height={40}
                      src={items.image}
                      alt={items.name}
                    />

                    <span className="ml-2 max-sm:hidden">{items.name}</span>
                  </Link>
                </td>

                <td
                  className={`text-center p-2 ${
                    isNegativeChange ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <Link
                    href={`/coins/${items.id}`}
                    className="w-full flex flex-row items-center"
                  >
                    ${items.current_price.toFixed(2)}
                  </Link>
                </td>
                <td
                  className={`text-center p-2 ${
                    isNegativeChange ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <Link
                    href={`/coins/${items.id}`}
                    className="w-full flex flex-row items-center"
                  >
                    {items.market_cap_change_percentage_24h.toFixed(2)}%
                  </Link>
                </td>
                <td className="text-center p-2">
                  <Link
                    href={`/coins/${items.id}`}
                    className="w-full flex flex-row items-center"
                  >
                    $ {items.market_cap?.toString().substring(0, 3)},
                    {items.market_cap?.toString().substring(3, 6)}M
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row w-10/12 items-center justify-center mt-5 gap-3 mb-5">
        {loadMore > 10 && (
          <button
            onClick={() => setLoadMore(loadMore - 10)}
            className="w-24 bg-[#FFD700] h-10 rounded-md text-black"
          >
            Show Less
          </button>
        )}
        <button
          onClick={() => setLoadMore(loadMore + 10)}
          className="w-24 bg-[#FFD700] h-10 rounded-md text-black"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Table;
