import React, { useEffect, useState } from "react";
import BasicDetailsthree from "./BasicDetailsthree";
import { motion, AnimatePresence } from "framer-motion";
import { Country, State, City } from "country-state-city";
import requests from "../lib/urls";
import axiosInstance from "../axios";

function BasicDetailstwo({ basicdetails }) {
  const [showCollegeField, setShowCollegeField] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [other, setOther] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    familyLive: "",
    highestEducation: "",
    employedIn: "",
    collegeName: "",
    occupation: "",
    otherOccupation: "",
    annualIncome: "",
  });

  const [options, setOptions] = useState({
    country: [],
    states: [],
    cities: [],
    educations: [],
    employements: [],
    occupations: [],
    income: [],
  });

  const [errors, setErrors] = useState({
    country: false,
    state: false,
    city: false,
    familyLive: false,
    highestEducation: false,
    employedIn: false,
    collegeName: false,
    occupation: false,
    otherOccupation: false,
    annualIncome: false,
  });

  const handleEducationChange = (event) => {
    const selectedValue = event.target.value;
    setShowCollegeField(selectedValue && selectedValue !== "Choose Education");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };

    for (const field in formData) {
      if (!formData[field] && field !== "otherOccupation") {
        newErrors[field] = true;
      } else {
        newErrors[field] = false;
      }
    }

    if (formData.occupation === "Other" && !formData.otherOccupation) {
      newErrors.otherOccupation = true;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setSubmit(true);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const countryData = Country.getAllCountries();
    setOptions((prevOptions) => ({
      ...prevOptions,
      country: countryData,
    }));
  }, []);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === formData.country
      );

      if (selectedCountry) {
        const states = State.getStatesOfCountry(selectedCountry.isoCode);
        setOptions((prevOptions) => ({
          ...prevOptions,
          states,
          cities: [], // Reset cities when country changes
        }));
      }
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === formData.country
      );

      const selectedState = State.getStatesOfCountry(
        selectedCountry?.isoCode
      ).find((state) => state.name === formData.state);

      if (selectedCountry && selectedState) {
        const cities = City.getCitiesOfState(
          selectedCountry.isoCode,
          selectedState.isoCode
        );
        setOptions((prevOptions) => ({
          ...prevOptions,
          cities: cities || [],
        }));
      }
    }
  }, [formData.country, formData.state]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [EducationRes, EmployementRes, OccupationRes, IncomeRes] =
          await Promise.all([
            axiosInstance.get(requests.Education),
            axiosInstance.get(requests.Employement),
            axiosInstance.get(requests.Occupation),
            axiosInstance.get(requests.Income),
          ]);

        // Add "Other" option if not present
        let occupations = OccupationRes.data || [];
        if (!occupations.some((occ) => occ.name === "Other")) {
          occupations = [...occupations, { id: "other", name: "Other" }];
        }

        setOptions((prevOptions) => ({
          ...prevOptions,
          educations: EducationRes.data || [],
          employements: EmployementRes.data || [],
          occupations,
          income: IncomeRes.data || [],
        }));
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        {!submit ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:max-w-2xl bg-white rounded-lg p-6 shadow-2xl mx-auto"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  Where does the groom / bride live? (Country)
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      state: "",
                      city: "",
                    })); // Reset state and city on country change
                  }}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.country ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Choose Country</option>
                  {options.country.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-xs text-red-500">{errors.country}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="state"
                >
                  Where does the groom / bride live? (State)
                </label>
                <select
                  id="state"
                  value={formData.state}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      city: "",
                    })); // Reset city on state change
                  }}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.state ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Choose State</option>
                  {options.states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  Where does the groom / bride live? (City)
                </label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.city ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Choose City</option>
                  {options.cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Does family live with groom / bride?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-700">
                    <input
                      className="appearance-none h-5 w-5 border border-gray rounded-full bg-white checked:bg-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="radio"
                      name="family-live"
                      value="yes"
                      id="familyLive"
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label className="flex items-center text-gray-700">
                    <input
                      className="appearance-none h-5 w-5 border border-gray rounded-full bg-white checked:bg-button focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="radio"
                      name="family-live"
                      id="familyLive"
                      value="no"
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
                {errors.familyLive && (
                  <p className="text-red text-xs mt-1">
                    This field is required
                  </p>
                )}
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
                  id="highestEducation"
                  value={formData.highestEducation}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleEducationChange(e);
                  }}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.highestEducation ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Choose Education</option>
                  {options.educations.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.highest_education}
                    </option>
                  ))}
                </select>
                {errors.highestEducation && (
                  <p className="text-red text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="employed-in"
                >
                  Employed In
                </label>
                <select
                  id="employedIn"
                  value={formData.employedIn}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.employedIn ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Choose Employment</option>
                  {options.employements.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.employed_in}
                    </option>
                  ))}
                </select>
                {errors.employedIn && (
                  <p className="text-red text-xs mt-1">
                    This field is required
                  </p>
                )}
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
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                      errors.collegeName ? "border-red" : "border-gray"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    placeholder="Enter Institute or College Name"
                  />
                  {errors.collegeName && (
                    <p className="text-red text-xs mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Occupation
                </label>
                <select
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => {
                    handleInputChange(e);
                    // Check if the selected option's text is "Other"
                    const selectedOption =
                      e.target.options[e.target.selectedIndex].text;
                    setOther(selectedOption === "Other");
                  }}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.occupation ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Choose Occupation</option>
                  {options.occupations.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.occupation && (
                  <p className="text-red text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            {other && (
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="other-occupation"
                  >
                    Other Occupation
                  </label>
                  <input
                    type="text"
                    id="otherOccupation"
                    value={formData.otherOccupation}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                      errors.otherOccupation ? "border-red" : "border-gray"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    placeholder="Enter Occupation"
                  />
                  {errors.otherOccupation && (
                    <p className="text-red text-xs mt-1">
                      This field is required
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Annual Income */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="annualIncome"
                >
                  Annual Income
                </label>
                <select
                  id="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.annualIncome ? "border-red" : "border-gray"
                  } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                >
                  <option value="">Select Annual Income</option>
                  {options.income.map((money) => (
                    <option key={money.id} value={money.id}>
                      {money.annual_income}
                    </option>
                  ))}
                </select>
                {errors.annualIncome && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
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
            <BasicDetailsthree
              basicdetails={basicdetails}
              groomBrideDetails={formData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BasicDetailstwo;
