import React from "react";
import Carousel from "./Carousel";

const Header = () => {
  return (
    <div
      className="w-full mx-auto flex flex-col justify-start items-center bg-center bg-cover h-[25rem]"
      style={{
        backgroundImage: `url(/headerbanner.jpg)`,
      }}
    >
      <p className="text-6xl font-bold mt-10 text-center">Crypto Tracker</p>
      <p className="text-gray-400 font-light mt-5 text-center">
        Get All The Info Regarding Your Favorite Crypto Currency
      </p>
      <Carousel />
    </div>
  );
};

export default Header;
