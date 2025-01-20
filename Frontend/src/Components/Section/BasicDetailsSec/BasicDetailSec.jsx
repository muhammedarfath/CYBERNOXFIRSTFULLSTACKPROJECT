import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BasicDetailstwo from "../../../Pages/BasicDetailstwo";
import { FaChevronDown } from "react-icons/fa";

function BasicDetailSec() {
  const [submit, setSubmit] = useState(false);
  const [physicalChallenges, setPhysicalChallenges] = useState("");

  return (
    <div className="flex lg:w-1/2 justify-center w-full md:p-4">
      <AnimatePresence mode="wait">
        {!submit ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:max-w-2xl bg-white rounded-lg p-6 shadow-2xl"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="groom-name"
                >
                  Groom / Bride Name
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 bg-gray-200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="groom-name"
                  type="text"
                  placeholder="Enter Groom Name"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/3 px-3 mb-3 sm:mb-0 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Day
                </label>
                <div className="relative">
                  <select className="block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pr-10 appearance-none">
                    <option>Day</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="w-full sm:w-1/3 px-3 mb-3 sm:mb-0 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Month
                </label>
                <div className="relative">
                  <select className="block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pr-10 appearance-none">
                    <option>Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="w-full sm:w-1/3 px-3 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Year
                </label>
                <div className="relative">
                  <select className="block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pr-10 appearance-none">
                    <option>Year</option>
                    {[...Array(100)].map((_, i) => (
                      <option key={i} value={2024 - i}>
                        {2024 - i}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="marital-status"
                >
                  Marital Status
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="marital-status"
                >
                  <option>Choose One</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Sect
                </label>
                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Choose Sect</option>
                  <option>Sunni</option>
                  <option>Shia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Caste
                </label>
                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Choose Caste</option>
                  <option>Caste A</option>
                  <option>Caste B</option>
                  <option>Caste C</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Mother Tongue
                </label>
                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Choose Language</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Height
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full text-gray-700 bg-gray-200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter Height"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Weight (in kg)
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full text-gray-700 bg-gray-200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter Weight"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Body Type
                </label>
                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Choose Body Type</option>
                  <option>Slim</option>
                  <option>Athletic</option>
                  <option>Average</option>
                  <option>Heavy</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Physical Challenges
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center text-gray-700">
                    <input
                      type="radio"
                      name="physicalChallenges"
                      value="Yes"
                      checked={physicalChallenges === "Yes"}
                      onChange={(e) => setPhysicalChallenges(e.target.value)}
                      className="appearance-none h-5 w-5 border border-gray rounded-full bg-white checked:bg-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>

                  <label className="flex items-center text-gray-700">
                    <input
                      type="radio"
                      name="physicalChallenges"
                      value="No"
                      checked={physicalChallenges === "No"}
                      onChange={(e) => setPhysicalChallenges(e.target.value)}
                      className="appearance-none h-5 w-5 border border-gray rounded-full bg-white checked:bg-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>

            {physicalChallenges === "Yes" && (
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Physical Status
                  </label>
                  <input
                    type="text"
                    className="appearance-none block w-full text-gray-700 bg-gray-200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Enter Physical Status"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center flex-col">
              <button
                className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setSubmit(true)}
              >
                SUBMIT
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <BasicDetailstwo />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BasicDetailSec;
