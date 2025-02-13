import React, { useEffect, useState } from "react";
import AadharOtp from "./AadharOtp";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../axios";
import requests from "../lib/urls";
import { useSelector } from "react-redux";

function BasicDetailsthree({ basicdetails, groomBrideDetails }) {
  const [submit, setSubmit] = useState(false);
  const {userId} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    familyType: "",
    familyStatus: "",
    fatherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    marriedBrothers: "",
    marriedSisters: "",
    familyDescription: "",
  });
  const [errors, setErrors] = useState({});

  const [options, setOptions] = useState({
    family: [],
    familyStatus: [],
    occupation: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [familyRes, familystatusRes, occupationRes] = await Promise.all([
          axiosInstance.get(requests.familyType),
          axiosInstance.get(requests.familyStatus),
          axiosInstance.get(requests.Occupation),
        ]);

        setOptions({
          family: familyRes.data,
          familyStatus: familystatusRes.data,
          occupation: occupationRes.data,
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    setErrors({ ...errors, [id]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = "This field is required";
      }
    });
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      basicdetails: basicdetails,
      groomBrideDetails: groomBrideDetails,
      formData: formData,
      user: userId,
    };
    
    console.log("Payload before submit:", payload);

    try {
      const response = await axiosInstance.post(
        requests.profileGroomFamily,
        payload,
      );

      console.log("Response:", response.data);

      setSubmit(true);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.familyType ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="familyType"
                  value={formData.familyType}
                  onChange={handleChange}
                >
                  <option>Choose Family Type</option>
                  {options.family.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.familyType && (
                  <p className="text-red text-xs mt-1">{errors.familyType}</p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.familyStatus ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="familyStatus"
                  value={formData.familyStatus}
                  onChange={handleChange}
                >
                  <option>Choose Family Status</option>
                  {options.familyStatus.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.familyStatus && (
                  <p className="text-red text-xs mt-1">{errors.familyStatus}</p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.fatherName ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="fatherName"
                  placeholder="Enter Father's Name"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
                {errors.fatherName && (
                  <p className="text-red text-xs mt-1">{errors.fatherName}</p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.fatherOccupation ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                >
                  <option>Choose Father's Occupation</option>
                  {options.occupation.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                  <option>Other</option>
                </select>
                {errors.fatherOccupation && (
                  <p className="text-red text-xs mt-1">
                    {errors.fatherOccupation}
                  </p>
                )}
              </div>

              <div className="w-full sm:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="mother-occupation"
                >
                  Mother's Occupation
                </label>
                <select
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.motherOccupation ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                >
                  <option>Choose Mother's Occupation</option>
                  {options.occupation.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                  <option>Other</option>
                </select>
                {errors.motherOccupation && (
                  <p className="text-red text-xs mt-1">
                    {errors.motherOccupation}
                  </p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.brothers ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="brothers"
                  value={formData.brothers}
                  onChange={handleChange}
                  placeholder="Enter number of brothers"
                />
                {errors.brothers && (
                  <p className="text-red text-xs mt-1">{errors.brothers}</p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.sisters ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="sisters"
                  value={formData.sisters}
                  onChange={handleChange}
                  placeholder="Enter number of sisters"
                />
                {errors.sisters && (
                  <p className="text-red text-xs mt-1">{errors.sisters}</p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.marriedBrothers ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="marriedBrothers"
                  value={formData.marriedBrothers}
                  onChange={handleChange}
                  placeholder="Enter number of married brothers"
                />
                {errors.marriedBrothers && (
                  <p className="text-red text-xs mt-1">
                    {errors.marriedBrothers}
                  </p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.marriedSisters ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="marriedSisters"
                  value={formData.marriedSisters}
                  onChange={handleChange}
                  placeholder="Enter number of married sisters"
                />
                {errors.marriedSisters && (
                  <p className="text-red text-xs mt-1">
                    {errors.marriedSisters}
                  </p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.familyDescription ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="familyDescription"
                  value={formData.familyDescription}
                  onChange={handleChange}
                  placeholder="Tell us about your family"
                  rows="4"
                />
                {errors.familyDescription && (
                  <p className="text-red text-xs mt-1">
                    {errors.familyDescription}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <button
                className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
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
