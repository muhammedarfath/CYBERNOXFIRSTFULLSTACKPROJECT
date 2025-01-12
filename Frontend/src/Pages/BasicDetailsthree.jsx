import React, { useState } from "react";
import AadharOtp from "./AadharOtp";
import { motion, AnimatePresence } from "framer-motion";

function BasicDetailsthree() {
  const [submit, setSubmit] = useState(false);

  return (
    <div className="flex justify-center w-full md:p-4">
      <AnimatePresence mode="wait">
        {!submit ? (
          <motion.form className="w-full md:max-w-2xl bg-white rounded-lg p-6 shadow-2xl mx-auto">
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="family-type"
                >
                  Family Type
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="family-type"
                >
                  <option>Choose Family Type</option>
                  <option>Nuclear</option>
                  <option>Joint</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="family-status"
                >
                  Family Financial Status
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="family-status"
                >
                  <option>Choose Family Status</option>
                  <option>Affluent</option>
                  <option>Middle Class</option>
                  <option>Lower Class</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="father-name"
                >
                  Father's Name
                </label>
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="father-name"
                  placeholder="Enter Father's Name"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="father-occupation"
                >
                  Father's Occupation
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="father-occupation"
                >
                  <option>Choose Father's Occupation</option>
                  <option>Engineer</option>
                  <option>Doctor</option>
                  <option>Teacher</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="mother-occupation"
                >
                  Mother's Occupation
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="mother-occupation"
                >
                  <option>Choose Mother's Occupation</option>
                  <option>Housewife</option>
                  <option>Teacher</option>
                  <option>Doctor</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-6 ">
              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="brothers"
                >
                  Number of Brothers
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="brothers"
                  placeholder="Enter number of brothers"
                />
              </div>

              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="sisters"
                >
                  Number of Sisters
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="sisters"
                  placeholder="Enter number of sisters"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6 ">
              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="married-brothers"
                >
                  Number of Married Brothers
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="married-brothers"
                  placeholder="Enter number of married brothers"
                />
              </div>

              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="married-sisters"
                >
                  Number of Married Sisters
                </label>
                <input
                  type="number"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="married-sisters"
                  placeholder="Enter number of married sisters"
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="family-description"
                >
                  About My Family
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="family-description"
                  placeholder="Tell us about your family"
                  rows="4"
                />
              </div>
            </div>
            <div className="flex justify-center">
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
            <AadharOtp />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BasicDetailsthree;
