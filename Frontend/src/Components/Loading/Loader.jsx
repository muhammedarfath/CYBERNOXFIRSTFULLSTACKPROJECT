import React from "react";
import Loading from "../../assets/Animation LottieFiles.gif"; // Path to your loader GIF

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col justify-center items-center">
        <img
          src={Loading}
          alt="Loading..."
          className="w-32 h-32 sm:w-48 sm:h-48 mb-4"
        />
        <p className="text-lg sm:text-xl font-semibold text-black">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default Loader;
