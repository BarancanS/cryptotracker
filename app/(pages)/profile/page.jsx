"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, onSnapshot } from "../../../shared/firebase";
import { query, collection, where } from "firebase/firestore";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Skeleton from "react-loading-skeleton";
import { CryptoState } from "../../CryptoContext";
import { profileSingleCoin } from "../../../app/config/api";

const ProfilePage = () => {
  const { currency, setCurrency, symbol } = CryptoState();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [realList, setRealList] = useState([]);
  const [loadMore, setLoadMore] = useState(10);
  const [status, setStatus] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (user && user.uid) {
      const fetchData = async () => {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("uid", "==", user.uid));

        const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setList(data.List);
            setName(data.name);

            // Hide the loading animation once the data is fetched
            setShowSkeleton(false);

            // Fetch data for each item in the list
            const fetchDataForItems = async () => {
              const itemsData = [];

              for (const items of data.List) {
                try {
                  const response = await fetch(profileSingleCoin(items.id));
                  const itemData = await response.json();
                  itemsData.push(itemData);
                } catch (error) {
                  console.error(error);
                }
              }

              setRealList(itemsData);
            };

            fetchDataForItems();
          }
        });

        return () => unsubscribe();
      };

      fetchData();
    } else {
      setShowSkeleton(false);
    }
  }, [user]);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  const fetchData = useCallback(async () => {
    if (!user || !user.uid) {
      return; // Return early if user is not available
    }

    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setList(data.List);
        setName(data.name);

        // Hide the loading animation once the data is fetched
        setShowSkeleton(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    fetchData(); // Call the fetchData function unconditionally
  }, [fetchData]);

  return loading ? (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <h1>Loading</h1>
        <div className="pulseLoader"></div>
      </div>
    </div>
  ) : user ? (
    <section>
      {" "}
      <div>
        <Navbar />
        <div>
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <h1 className="text-4xl mb-4">
              Cryptocurrency Prices by Market Cap
            </h1>
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
                {realList.slice(0, loadMore).map((items, index) => {
                  const isNegativeChange =
                    items.market_data.market_cap_change_percentage_24h < 0;
                  return (
                    <tr
                      key={index}
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
                            src={items.image.thumb}
                            alt={items.name}
                          />

                          <span className="ml-2 max-sm:hidden">
                            {items.name}
                          </span>
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
                          {currency === "usd" ? (
                            <label htmlFor="" className="font-light">
                              {symbol}
                              {items.market_data.current_price.usd}
                            </label>
                          ) : (
                            <label htmlFor="">
                              {symbol}
                              {items.market_data.current_price.try}
                            </label>
                          )}
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
                          {items.market_data.market_cap_change_percentage_24h.toFixed(
                            2
                          )}
                          %
                        </Link>
                      </td>
                      <td className="text-center p-2">
                        <Link
                          href={`/coins/${items.id}`}
                          className="w-full flex flex-row items-center"
                        >
                          {currency === "usd" ? (
                            <label htmlFor="" className="font-light">
                              {symbol}
                              {items.market_data.market_cap.usd
                                ?.toString()
                                .substring(0, 3)}
                            </label>
                          ) : (
                            <label htmlFor="">
                              {symbol}
                              {items.market_data.market_cap.try
                                ?.toString()
                                .substring(0, 3)}
                            </label>
                          )}
                          M
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex flex-row w-10/12 items-center justify-center mt-5 gap-3 mb-5">
              {loadMore > 12 && (
                <button
                  onClick={() => setLoadMore(loadMore - 10)}
                  className="w-24 bg-[#FFD700] h-10 rounded-md text-black"
                >
                  Show Less
                </button>
              )}{" "}
              {loadMore < list.length && (
                <button
                  onClick={() => setLoadMore(loadMore + 10)}
                  className="w-24 bg-[#FFD700] h-10 rounded-md text-black"
                >
                  Show More
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-7/12 max-md:w-7/12 flex flex-col items-center h-screen">
          {/* Content for the right side of the page */}
        </div>
      </div>
    </section>
  ) : (
    <div>
      {status ? (
        <div
          className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("/pexels-james-wheeler-1519088.jpg")`,
          }}
        >
          <SignIn />
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
          >
            Register Page
          </button>
        </div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("/pexels-piccinng-3075993.jpg")`,
          }}
        >
          <SignUp />
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
          >
            Login Page
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
