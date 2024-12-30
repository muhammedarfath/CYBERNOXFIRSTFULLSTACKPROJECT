import React, { useState } from "react";
import BasicDetailsthree from "./BasicDetailsthree";
import { motion, AnimatePresence } from "framer-motion";

function BasicDetailstwo() {
  const [showCollegeField, setShowCollegeField] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleEducationChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      setShowCollegeField(true);
    } else {
      setShowCollegeField(false);
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!submit ? (
          <motion.form className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-2xl mx-auto">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="groom-country"
                >
                  Where does the groom live? (Country)
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="groom-country"
                >
                  <option>Choose Country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="groom-state"
                >
                  Where does the groom live? (State)
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="groom-state"
                >
                  <option>Choose State</option>
                  <option>California</option>
                  <option>Texas</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="groom-city"
                >
                  Where does the groom live? (City)
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="groom-city"
                >
                  <option>Choose City</option>
                  <option>Bangalore</option>
                  <option>San Francisco</option>
                  <option>New York</option>
                  <option>Chennai</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Does family live with groom?
                </label>
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="family-live"
                />
                <label className="text-gray-700" htmlFor="family-live">
                  Yes
                </label>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="highest-education"
                >
                  Highest Education
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="highest-education"
                  onChange={handleEducationChange}
                >
                  <option>Choose Education</option>
                  <option>High School</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Doctorate</option>
                </select>
              </div>

              {showCollegeField && (
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="college-name"
                    >
                      Institute or College Name
                    </label>
                    <input
                      type="text"
                      className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="college-name"
                      placeholder="Enter Institute or College Name"
                    />
                  </div>
                </div>
              )}

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="employed-in"
                >
                  Employed In
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="employed-in"
                >
                  <option>Choose Employment</option>
                  <option>Government</option>
                  <option>Private</option>
                  <option>Self-employed</option>
                  <option>Unemployed</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="occupation"
                >
                  Occupation
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="occupation"
                >
                  <option>Choose Occupation</option>
                  <option>Engineer</option>
                  <option>Doctor</option>
                  <option>Teacher</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

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
            
            <BasicDetailsthree />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BasicDetailstwo;
