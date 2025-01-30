import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BasicDetailstwo from "../../../Pages/BasicDetailstwo";
import { FaChevronDown } from "react-icons/fa";
import requests from "../../../lib/urls";
import axiosInstance from "../../../axios";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import Loader from "../../Loading/Loader";

languages.registerLocale(en);

function BasicDetailSec() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    groomName: "",
    day: "",
    month: "",
    year: "",
    selectedMarital: "",
    selectedReligion: "",
    selectedCaste: "",
    selectedTongue: "",
    selectBodyType: "",
    height: "",
    weight: "",
    physicalStatus: "",
    typeofphysicalStatus: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [options, setOptions] = useState({
    maritals: [],
    religions: [],
    castes: [],
    motherTongue: [],
    bodyType: [],
  });


  useEffect(() => {
    const fetchOptions = async () => {
     const allLanguages = languages.getNames("en")

      try {
        const [maritalsRes, religionsRes, bodyTypeRes] = await Promise.all([
          axiosInstance.get(requests.getMarital),
          axiosInstance.get(requests.getReligion),
          axiosInstance.get(requests.BodyType),
        ]);

        setOptions({
          maritals: maritalsRes.data,
          religions: religionsRes.data,
          bodyType: bodyTypeRes.data,
          motherTongue:Object.entries(allLanguages).map(([code, name]) => ({
            value: code,
            label: name,
          })),
          castes: [],
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchCastes = async () => {
      if (formData.selectedReligion) {
        try {
          const response = await axiosInstance.get(
            `${requests.getCast}${formData.selectedReligion}`
          );
          setOptions((prev) => ({ ...prev, castes: response.data }));
        } catch (error) {
          console.error("Error fetching castes:", error);
        }
      }
    };
    fetchCastes();
  }, [formData.selectedReligion]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [id]: value };

      if (
        updatedFormData.day &&
        updatedFormData.month &&
        updatedFormData.year
      ) {
        const dateOfBirth = `${
          updatedFormData.year
        }-${updatedFormData.month.padStart(
          2,
          "0"
        )}-${updatedFormData.day.padStart(2, "0")}`;
        updatedFormData.dateOfBirth = dateOfBirth;
      }

      return updatedFormData;
    });
  };

  const handleValidation = () => {
    const errors = {};
    const requiredFields = [
      "groomName",
      "day",
      "month",
      "year",
      "selectedMarital",
      "selectedReligion",
      "selectedCaste",
      "selectedTongue",
      "selectBodyType",
      "height",
      "weight",
      "physicalStatus",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    if (formData.physicalStatus === "Yes" && !formData.typeofphysicalStatus) {
      errors.typeofphysicalStatus = "Physical status description is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      console.log(formData);
      setSubmit(true);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader/>
      </div>
    );
  }

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
                  className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                    formErrors.groomName ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  id="groomName"
                  type="text"
                  placeholder="Enter Groom Name"
                  onChange={handleInputChange}
                />
                {formErrors.groomName && (
                  <p className="text-red text-xs italic">
                    {formErrors.groomName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/3 px-3 mb-3 sm:mb-0 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Day
                </label>
                <div className="relative">
                  <select
                    className={`block w-full bg-gray-200 text-gray-700 border ${
                      formErrors.day ? "border-red" : "border-gray"
                    } rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pr-10 appearance-none`}
                    value={formData.day}
                    id="day"
                    onChange={handleInputChange}
                  >
                    <option value="">Day</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                {formErrors.day && (
                  <p className="text-red text-xs italic">{formErrors.day}</p>
                )}
              </div>

              {/* Month Field */}
              <div className="w-full sm:w-1/3 px-3 mb-3 sm:mb-0 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Month
                </label>
                <div className="relative">
                  <select
                    className={`block w-full bg-gray-200 text-gray-700 border ${
                      formErrors.month ? "border-red" : "border-gray"
                    } rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pr-10 appearance-none`}
                    value={formData.month}
                    id="month"
                    onChange={handleInputChange}
                  >
                    <option value="">Month</option>
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
                {formErrors.month && (
                  <p className="text-red text-xs italic">{formErrors.month}</p>
                )}
              </div>

              {/* Year Field */}
              <div className="w-full sm:w-1/3 px-3 relative">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Year
                </label>
                <div className="relative">
                  <select
                    className={`block w-full bg-gray-200 text-gray-700 border ${
                      formErrors.year ? "border-red" : "border-gray"
                    } rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 pr-10 appearance-none`}
                    value={formData.year}
                    id="year"
                    onChange={handleInputChange}
                  >
                    <option value="">Year</option>
                    {[...Array(100)].map((_, i) => (
                      <option key={i} value={2024 - i}>
                        {2024 - i}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                {formErrors.year && (
                  <p className="text-red text-xs italic">{formErrors.year}</p>
                )}
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
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    formErrors.selectedMarital ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="selectedMarital"
                  value={formData.selectedMarital}
                  onChange={handleInputChange}
                >
                  <option value="">Choose One</option>
                  {options.maritals.map((marital) => (
                    <option key={marital.id} value={marital.id}>
                      {marital.status}
                    </option>
                  ))}
                </select>
                {formErrors.selectedMarital && (
                  <p className="text-red text-xs italic">
                    {formErrors.selectedMarital}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Religion
                </label>
                <select
                  value={formData.selectedReligion}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    formErrors.selectedReligion ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  onChange={handleInputChange}
                  id="selectedReligion"
                >
                  <option value="">Select Religion</option>
                  {options.religions.map((religion) => (
                    <option key={religion.id} value={religion.id}>
                      {religion.name}
                    </option>
                  ))}
                </select>
                {formErrors.selectedReligion && (
                  <p className="text-red text-xs italic">
                    {formErrors.selectedReligion}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Caste
                </label>
                <select
                  id="selectedCaste"
                  value={formData.selectedCaste}
                  onChange={handleInputChange}
                  disabled={!formData.selectedReligion}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    formErrors.selectedCaste ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Select Caste</option>
                  {options.castes.map((caste) => (
                    <option key={caste.id} value={caste.id}>
                      {caste.name}
                    </option>
                  ))}
                </select>
                {formErrors.selectedCaste && (
                  <p className="text-red text-xs italic">
                    {formErrors.selectedCaste}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Mother Tongue
                </label>
                <select
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    formErrors.selectedTongue ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="selectedTongue"
                  value={formData.selectedTongue}
                  onChange={handleInputChange}
                >
                  <option value="">Choose Language</option>
                  {options.motherTongue.map((option) => (
                    <option key={option.value} value={option.name}>
                      {option.label}
                    </option>
                  ))}
                </select>
         

                {formErrors.selectedTongue && (
                  <p className="text-red text-xs italic">
                    {formErrors.selectedTongue}
                  </p>
                )}
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Height
                </label>
                <input
                  id="height"
                  type="number"
                  className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                    formErrors.height ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  placeholder="Enter Height"
                  onChange={handleInputChange}
                />
                {formErrors.height && (
                  <p className="text-red text-xs italic">{formErrors.height}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Weight (in kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                    formErrors.weight ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  placeholder="Enter Weight"
                  onChange={handleInputChange}
                />
                {formErrors.weight && (
                  <p className="text-red text-xs italic">{formErrors.weight}</p>
                )}
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Body Type
                </label>
                <select
                  id="selectBodyType"
                  className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                    formErrors.selectBodyType ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  value={formData.selectBodyType}
                  onChange={handleInputChange}
                >
                  <option value="">Choose Body Type</option>
                  {options.bodyType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {formErrors.selectBodyType && (
                  <p className="text-red text-xs italic">
                    {formErrors.selectBodyType}
                  </p>
                )}
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
                      id="physicalStatus"
                      type="radio"
                      name="physicalChallenges"
                      value="Yes"
                      checked={formData.physicalStatus === "Yes"}
                      onChange={handleInputChange}
                      className="appearance-none h-5 w-5 border border-gray rounded-full bg-white checked:bg-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>

                  <label className="flex items-center text-gray-700">
                    <input
                      id="physicalStatus"
                      type="radio"
                      name="physicalChallenges"
                      value="No"
                      checked={formData.physicalStatus === "No"}
                      onChange={handleInputChange}
                      className="appearance-none h-5 w-5 border border-gray rounded-full bg-white checked:bg-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>

            {formData.physicalStatus === "Yes" && (
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Physical Status
                  </label>
                  <input
                    type="text"
                    className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                      formErrors.typeofphysicalStatus
                        ? "border-red"
                        : "border-gray-300"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    placeholder="Enter Physical Status"
                    value={formData.typeofphysicalStatus}
                    onChange={handleInputChange}
                    required={formData.physicalStatus === "Yes"}
                    id="typeofphysicalStatus"
                  />
                  {formErrors.typeofphysicalStatus && (
                    <p className="text-xs text-red">
                      Physical status is required
                    </p>
                  )}
                </div>
              </div>
            )}

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
            <BasicDetailstwo basicdetails={formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BasicDetailSec;
