import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BasicDetailstwo from "../../../Pages/BasicDetailstwo";
import requests from "../../../lib/urls";
import axiosInstance from "../../../axios";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import Loader from "../../Loading/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";

languages.registerLocale(en);

function BasicDetailSec() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    groomBride: "",
    dateOfBirth: null,
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
    physicalType: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const allLanguages = languages.getNames("en");

      try {
        const [maritalsRes, religionsRes, bodyTypeRes, physicalStatusRes] =
          await Promise.all([
            axiosInstance.get(requests.getMarital),
            axiosInstance.get(requests.getReligion),
            axiosInstance.get(requests.BodyType),
            axiosInstance.get(requests.fetchPhysicalStatus),
          ]);

        setOptions({
          maritals: maritalsRes.data,
          religions: religionsRes.data,
          bodyType: bodyTypeRes.data,
          physicalType: physicalStatusRes.data,
          motherTongue: Object.entries(allLanguages).map(([code, name]) => ({
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

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleValidation = () => {
    const errors = {};
    const requiredFields = [
      "groomBride",
      "dateOfBirth",
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

    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();

      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        errors.dateOfBirth = "You must be at least 18 years old.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "dateOfBirth" && value) {
          const formattedDate = new Date(value).toISOString().split("T")[0];
          data.append(key, formattedDate);
        } else {
          data.append(key, value);
        }
      });
      console.log(Object.fromEntries(data));
      setSubmit(true);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  console.log(formData);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={value}
        onClick={onClick}
        ref={ref}
        className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
          formErrors.dateOfBirth ? "border-red" : "border-gray"
        } rounded py-3 pr-28 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        placeholder="Date of Birth"
      />
      <SlCalender
        className="absolute right-3 top-3 text-gray-600 cursor-pointer"
        onClick={onClick}
      />
    </div>
  ));

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
                    formErrors.groomBride ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  id="groomBride"
                  type="text"
                  placeholder="Enter Groom Name"
                  onChange={handleInputChange}
                />
                {formErrors.groomBride && (
                  <p className="text-red text-xs italic">
                    {formErrors.groomBride}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full sm:w-1/2 px-3">
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
              <div className="w-full  md:mt-0 sm:w-1/2 px-3 mb-3 sm:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Date of Birth
                </label>
                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, dateOfBirth: date }))
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date of Birth"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  maxDate={new Date()}
                  customInput={<CustomInput />}
                />
                {formErrors.dateOfBirth && (
                  <span className="text-red text-xs italic">{formErrors.dateOfBirth}</span>
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
                <select
                  id="height"
                  className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                    formErrors.height ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  value={formData.height}
                  onChange={handleInputChange}
                >
                  <option value="">Select Height</option>
                  {Array.from({ length: 100 }, (_, i) => i + 100).map(
                    (height) => (
                      <option
                        key={height}
                        value={height}
                      >{`${height} cm`}</option>
                    )
                  )}
                </select>

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
                  <select
                    id="typeofphysicalStatus"
                    className={`appearance-none block w-full text-gray-700 bg-gray-200 border ${
                      formErrors.typeofphysicalStatus ? "border-red" : "border-gray"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    value={formData.typeofphysicalStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose Body Type</option>
                    {options.physicalType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.status}
                      </option>
                    ))}
                  </select>
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
