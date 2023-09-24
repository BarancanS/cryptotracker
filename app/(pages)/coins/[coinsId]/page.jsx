"use client";
import React, { useState, useEffect } from "react";
import { CryptoState } from "../../../CryptoContext";
import { HistoricalChart } from "../../../../app/config/api";
import { SingleCoin } from "../../../../app/config/api";
import Navbar from "@/app/components/Navbar";
import jsonData from "../../../datas.json";
import Link from "next/link";
import { auth } from "../../../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "@/app/components/SignIn";
import SignUp from "@/app/components/SignUp";
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../../../shared/firebase";
import Skeleton from "react-loading-skeleton"; // Import the skeleton loading component
import Image from "next/image";

const Page = ({ params }) => {
  const { currency, setCurrency, symbol } = CryptoState();
  const [singleCoinDetail, setSingleCoinDetail] = useState([]);
  const [coinsHistoricalChart, setCoinsHistoricalChart] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);
  const [documentId, setDocumentId] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [displayAddRemove, setDisplayAddRemove] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true); // State to control when to show the skeleton

  const handleStatusChange = () => {
    setStatus(!status);
  };

  useEffect(() => {
    getTrendsApi();
    getSingleCoin();
  }, []);

  const coinsParam = params.coinsId;

  const getTrendsApi = async () => {
    try {
      const response = await fetch(HistoricalChart(coinsParam, currency));
      const data = await response.json();
      setCoinsHistoricalChart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleCoin = async () => {
    try {
      const response = await fetch(SingleCoin(coinsParam));
      const data = await response.json();
      setSingleCoinDetail([data]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchDocumentIdData = async () => {
        try {
          const userRef = collection(db, "users");
          const userQuery = query(userRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].id;
            setDocumentId(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchDocumentIdData();
    }
  }, [documentId, user]);

  useEffect(() => {
    if (!user || !documentId) {
      return;
    }

    const userDocRef = doc(db, "users", documentId);

    const fetchListData = async () => {
      try {
        const userDoc = await getDoc(userDocRef);
        const userDocData = userDoc.data();
        if (userDocData && userDocData.List) {
          const userItemListIds = userDocData.List.map((item) => item.id);
          const updatedDisplayAddRemove = singleCoinDetail.map((item) => ({
            id: item.id,
            display: userItemListIds.includes(item.id),
          }));
          setDisplayAddRemove(updatedDisplayAddRemove);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchListData();
  }, [user, documentId, singleCoinDetail]);

  useEffect(() => {
    // Delay the button display for 0.7 seconds after component mounts
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 700);

    // Show the skeleton for a few seconds after component mounts
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000); // Adjust the time as needed

    return () => {
      // Clear the timers if the component unmounts
      clearTimeout(timer);
      clearTimeout(skeletonTimer);
    };
  }, []);

  const handleAddRemove = async (itemId) => {
    const userId = documentId;
    const userDocRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userDocRef);
      const List = userDoc.data().List || [];

      const isDataAlreadyInList = List.some((item) => item.id === itemId);

      if (isDataAlreadyInList) {
        const updatedUserData = List.filter((item) => item.id !== itemId);
        await updateDoc(userDocRef, { List: updatedUserData });
        console.log("Document successfully updated! (Deleted)");
      } else {
        const itemToAdd = singleCoinDetail.find((item) => item.id === itemId);
        if (itemToAdd) {
          const updatedUserData = [...List, itemToAdd];
          await updateDoc(userDocRef, { List: updatedUserData });
          console.log("Document successfully updated! (Added)");
        }
      }

      // Update the displayAddRemove state after the add/remove operation
      const updatedDisplayAddRemove = displayAddRemove.map((item) =>
        item.id === itemId ? { ...item, display: !isDataAlreadyInList } : item
      );
      setDisplayAddRemove(updatedDisplayAddRemove);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showSkeleton ? ( // Show skeleton for a few seconds when the component mounts
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Skeleton width={200} height={200} /> {/* Skeleton for image */}
          <Skeleton width={300} height={60} /> {/* Skeleton for title */}
          <Skeleton width={300} height={20} /> {/* Skeleton for category */}
          <Skeleton width={200} height={20} /> {/* Skeleton for description */}
          <Skeleton width={100} height={20} /> {/* Skeleton for rank */}
          <Skeleton width={150} height={20} />{" "}
          {/* Skeleton for current price */}
          <Skeleton width={150} height={20} /> {/* Skeleton for market cap */}
          {showButton && (
            <div>
              <h1>Loading</h1>
              <div className="pulseLoader"></div>
            </div>
          )}
        </div>
      ) : (
        <section>
          <div>
            {user ? (
              <div>
                <Navbar />
                <div className="flex flex-row max-md:flex-col w-11/12 mx-auto">
                  <div className="w-5/12 max-md:w-full p-5 h-[calc(100vh-10vh)] flex flex-col items-center max-md:border-0 border-r-2">
                    {singleCoinDetail.map((items, index) => {
                      return (
                        <div className="w-full" key={index}>
                          <img
                            src={items.image.large}
                            alt={items.name}
                            className="mx-auto"
                            width={200}
                            height={200}
                          />
                          <h1 className="text-6xl max-md:text-xl text-center font-extrabold">
                            {items.name}
                          </h1>
                          <p className="break-all text-center text-lg max-md:text-base text-gray-500">
                            {items.categories}
                          </p>
                          <div className="max-md:text-sm text-base">
                            <p className="break-all">
                              {items.description.en.substring(0, 120)}...
                            </p>
                            <p>
                              <label htmlFor="">
                                Rank: {items.market_cap_rank}
                              </label>
                            </p>
                            <p>
                              <label htmlFor="">
                                Current Price: {symbol}
                                {currency === "usd" ? (
                                  <label htmlFor="">
                                    {items.market_data.current_price.usd}
                                  </label>
                                ) : (
                                  <label htmlFor="">
                                    {items.market_data.current_price.try}
                                  </label>
                                )}
                              </label>
                            </p>
                            <p>
                              <label htmlFor="">
                                Market Cap: {symbol}
                                {currency === "usd" && (
                                  <label htmlFor="">
                                    {items.market_data.market_cap.usd}
                                  </label>
                                )}
                                {currency === "try" && (
                                  <label htmlFor="">
                                    {items.market_data.market_cap.try}
                                  </label>
                                )}
                              </label>
                            </p>
                            {showButton && (
                              <button
                                onClick={() => handleAddRemove(items.id)}
                                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
                              >
                                {displayAddRemove.find(
                                  (displayItem) => displayItem.id === items.id
                                )?.display
                                  ? "Remove from List"
                                  : "Add to List"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-7/12 max-md:w-7/12 flex flex-col items-center h-screen">
                    {/* Content for the right side of the page */}
                  </div>
                </div>
              </div>
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
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
