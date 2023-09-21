"use client";
import React from "react";
import { useState, useEffect } from "react";
import { TrendingCoins } from "../../../app/config/api";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import Image from "next/image";

const Carousel = () => {
  const [trendCoins, setTrendCoins] = useState([]);
  useEffect(() => {
    getTrendsApi();
  }, []);
  const getTrendsApi = async () => {
    return fetch(TrendingCoins())
      .then((response) => response.json())
      .then((data) => {
        setTrendCoins(data.coins);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items = trendCoins.map((items, index) => {
    return (
      <Link
        href={`/coins/${items.id}`}
        key={index}
        className="flex flex-col items-center justify-between"
      >
        <Image
          width={100}
          height={100}
          src={items.item.large}
          alt=""
          className="mx-auto"
        />
      </Link>
    );
  });

  return (
    <div className="w-full flex flex-row gap-5 mt-10 items-center justify-center">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={items}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
