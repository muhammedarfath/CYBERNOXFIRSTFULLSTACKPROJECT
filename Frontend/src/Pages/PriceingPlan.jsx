import React from "react";
import { Link } from "react-router-dom";
import PriceingCard from "../Components/Section/BasicDetailsSec/PriceingCard";

function PriceingPlan() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-primary">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              LOGO
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Get an exclusive{" "}
              <span className="font-medium text-white">20% discount</span> on your
              first purchase!
            </p>
          </div>
          <PriceingCard />
        </div>

        <div className="relative z-10 mt-8 w-full">
          <Link to="/">
            <h1 className="text-md underline text-center cursor-pointer">
              Skip for now
            </h1>
          </Link>
        </div>

        <div className="fixed p-6 w-full bottom-0 bg-white shadow-2xl shadow-black z-0">
          <div className="w-full h-full flex justify-between items-center">
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              ₹29 - Secure your access now!
            </p>

            <button className="bg-button text-white p-3 sm:p-4 rounded-md">
              PAY NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PriceingPlan;
