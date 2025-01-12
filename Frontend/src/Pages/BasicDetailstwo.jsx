import React, { useState } from "react";
import BasicDetailsthree from "./BasicDetailsthree";
import { motion, AnimatePresence } from "framer-motion";

function BasicDetailstwo() {
  const [showCollegeField, setShowCollegeField] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [other, setOther] = useState(false);

  const handleEducationChange = (event) => {
    const selectedValue = event.target.value;
    setShowCollegeField(selectedValue && selectedValue !== "Choose Education");
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!submit ? (
          <motion.form className="w-full md:max-w-2xl bg-white rounded-lg p-6 shadow-2xl mx-auto">
            {/* Groom's Country and State */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="groom-country"
                >
                  Where does the groom / bride live? (Country)
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  Where does the groom / bride live? (State)
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  Where does the groom / bride live? (City)
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

            {/* Family and Income Fields */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Does family live with groom / bride?
                </label>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      className="mr-2 leading-tight"
                      type="radio"
                      name="family-live"
                      value="yes"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      className="mr-2 leading-tight"
                      type="radio"
                      name="family-live"
                      value="no"
                    />
                    No
                  </label>
                </div>
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
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="employed-in"
                >
                  Employed In
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="college-name"
                    placeholder="Enter Institute or College Name"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-4">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="occupation"
                >
                  Occupation
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="occupation"
                  onChange={(e) => setOther(e.target.value === "Other")}
                >
                  <option>Choose Occupation</option>
                  <option>Engineer</option>
                  <option>Doctor</option>
                  <option>Teacher</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {other && (
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="other-occupation"
                  >
                    Other Occupation
                  </label>
                  <input
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="other-occupation"
                    placeholder="Enter Occupation"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="annual-income"
                >
                  Annual Income
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="annual-income"
                >
                  <option>Choose Annual Income</option>
                  <option>Below ₹3 Lakhs</option>
                  <option>₹3-5 Lakhs</option>
                  <option>₹5-10 Lakhs</option>
                  <option>₹10-20 Lakhs</option>
                  <option>₹20-50 Lakhs</option>
                  <option>Above ₹50 Lakhs</option>
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
