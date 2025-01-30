import React, { useState, useEffect } from "react";
import { IoIosBookmarks } from "react-icons/io";
import { IoHelp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomeFixedIcons() {
  const [showHelpText, setShowHelpText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHelpText(true);
      setTimeout(() => setShowHelpText(false), 3000); 
    }, 10000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <div className="fixed top-28 right-6 z-50 flex flex-col items-center space-y-3">
        <Link
          className="bg-button hidden md:block text-white p-3 rounded-full shadow-lg transition duration-200 transform hover:scale-110"
          to="/bookmarks"
        >
          <IoIosBookmarks className="text-3xl" />
        </Link>
      </div>
      <Link to="/help">
        <div className="fixed bottom-10 left-6 z-50 flex gap-3 justify-center items-center space-y-3">
          <div className="bg-button hidden md:block text-white p-3 rounded-full shadow-lg transition duration-200 transform hover:scale-110">
            <IoHelp className="text-3xl" />
          </div>
          {showHelpText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white hidden lg:block shadow-2xl shadow-button rounded-full w-full p-2"
            >
              Help / Support
            </motion.div>
          )}
        </div>
      </Link>
    </>
  );
}

export default HomeFixedIcons;
