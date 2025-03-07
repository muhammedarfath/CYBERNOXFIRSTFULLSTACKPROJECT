import React, { useEffect, useState } from "react";
import FilterItem from "./FilterItem";
import RangeSlider from "./RangeSlider";
import {
  FaBriefcase,
  FaDumbbell,
  FaGraduationCap,
  FaMoneyBillWave,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import { BiBody, BiWorld } from "react-icons/bi";
import requests from "../../lib/urls";
import axiosInstance from "../../axios";
import { Country, State } from "country-state-city";

function FilterOption({
  activeFilter,
  activeLocation,
  setActiveLocation,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  maritalStatus,
  setMaritalStatus,
  physicalStatus,
  setPhysicalStatus,
  educationPreference,
  setEducationPreference,
  professionPreference,
  setProfessionPreference,
  incomePreference,
  setIncomePreference,
  religionsPreference,
  setReligionsPreference,
  castPreference,
  setCastPreference,
  selectedReligion,
  setSelectedReligion,
  rangeFilters,
  setRangeFilters,
}) {
  const [options, setOptions] = useState({
    maritals: [],
    religions: [],
    castes: [],
    physicalStatuses: [],
    educations: [],
    professions: [],
    financialStatuses: [],
    countries: [],
    states: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          maritalsRes,
          religionsRes,
          physicalStatusRes,
          educationRes,
          professionRes,
          financialStatusRes,
        ] = await Promise.all([
          axiosInstance.get(requests.getMarital),
          axiosInstance.get(requests.getReligion),
          axiosInstance.get(requests.fetchPhysicalStatus),
          axiosInstance.get(requests.Education),
          axiosInstance.get(requests.Employement),
          axiosInstance.get(requests.Income),
        ]);

        setOptions({
          maritals: maritalsRes.data || [],
          religions: religionsRes.data || [],
          physicalStatuses: physicalStatusRes.data || [],
          educations: educationRes.data || [],
          professions: professionRes.data || [],
          financialStatuses: financialStatusRes.data || [],
          countries: Country.getAllCountries().map((c) => ({
            name: c.name,
            isoCode: c.isoCode,
          })),
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchCastes = async () => {
      if (selectedReligion) {
        try {
          const response = await axiosInstance.get(
            `${requests.getCast}${selectedReligion}`
          );
          setOptions((prev) => ({ ...prev, castes: response.data || [] }));
        } catch (error) {
          console.error("Error fetching castes:", error);
        }
      }
    };
    fetchCastes();
  }, [selectedReligion]);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry).map((s) => ({
        name: s.name,
        isoCode: s.isoCode,
      }));
      setOptions((prev) => ({ ...prev, states }));
    }
  }, [selectedCountry]);

  return (
    <>
      {activeFilter === "filter" && (
        <>
          <div className="space-y-4">
            <FilterItem
              icon={<RiHeartsFill />}
              title="Marital Status"
              options={options.maritals}
              onChange={setMaritalStatus}
            />

            <FilterItem
              icon={<FaUsers />}
              title="Religion"
              options={options.religions}
              onChange={(value) => {
                setReligionsPreference(value);
                setSelectedReligion(value);
              }}
            />

            <FilterItem
              icon={<FaUsers />}
              title="Caste"
              options={options.castes}
              onChange={setCastPreference}
            />

            <FilterItem
              icon={<BiBody />}
              title="Physical Status"
              options={options.physicalStatuses}
              onChange={setPhysicalStatus}
            />

            <FilterItem
              icon={<FaGraduationCap />}
              title="Education"
              options={options.educations}
              onChange={setEducationPreference}
            />

            <FilterItem
              icon={<FaBriefcase />}
              title="Profession"
              options={options.professions}
              onChange={setProfessionPreference}
            />

            <FilterItem
              icon={<FaMoneyBillWave />}
              title="Financial Status"
              options={options.financialStatuses}
              onChange={setIncomePreference}
            />
          </div>

          <div className="space-y-6 mt-4">
            <RangeSlider
              title="Weight"
              range={rangeFilters.weight}
              unit="Kg"
              icon={<FaDumbbell />}
              minValue={40}
              maxValue={100}
              onChange={(value) =>
                setRangeFilters((prev) => ({ ...prev, weight: value }))
              }
            />

            <RangeSlider
              title="Age"
              range={rangeFilters.age}
              unit="yrs"
              icon={<BiWorld />}
              minValue={18}
              maxValue={50}
              onChange={(value) =>
                setRangeFilters((prev) => ({ ...prev, age: value }))
              }
            />

            <RangeSlider
              title="Height"
              range={rangeFilters.height}
              unit="cm"
              icon={<BiBody />}
              minValue={140}
              maxValue={200}
              onChange={(value) =>
                setRangeFilters((prev) => ({ ...prev, height: value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4 my-6">
            <button
              className={`py-3 rounded-md shadow-md ${
                activeLocation === "location"
                  ? "bg-button text-white"
                  : "bg-gray text-gray-700"
              }`}
              onClick={() => setActiveLocation("location")}
            >
              Search by Location
            </button>
            <button
              className={`py-3 rounded-md shadow-md ${
                activeLocation === "distance"
                  ? "bg-button text-white"
                  : "bg-gray text-gray-700"
              }`}
              onClick={() => setActiveLocation("distance")}
            >
              Search by Distance
            </button>
          </div>

          {activeLocation === "location" && (
            <div className="space-y-4">
              <FilterItem
                icon={<MdLocationOn />}
                title="Home District"
                options={options.states}
                onChange={setSelectedState}
              />
              <FilterItem
                icon={<MdLocationOn />}
                title="Present Country"
                options={options.countries}
                onChange={setSelectedCountry}
              />
            </div>
          )}

          {activeLocation === "distance" && (
            <div className="space-y-4">
              <FilterItem icon={<MdLocationOn />} title="Distance" />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FilterOption;
