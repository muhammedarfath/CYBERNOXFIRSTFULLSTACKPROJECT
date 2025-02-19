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

function FilterOption({
  activeFilter,
  filters,
  activeLocation,
  setActiveLocation,
}) {
  // State for filter preferences
  const [maritalStatus, setMaritalStatus] = useState("Never Married");
  const [physicalStatus, setPhysicalStatus] = useState("No Health Issues");
  const [educationPreference, setEducationPreference] = useState("Any");
  const [professionPreference, setProfessionPreference] = useState("Any");
  const [incomePreference, setIncomePreference] = useState("Any");
  const [religionsPreference, setReligionsPreference] = useState("Any");
  const [castPreference, setCastPreference] = useState("Any");
  const [selectedReligion, setSelectedReligion] = useState(""); // Added state for selected religion

  const [options, setOptions] = useState({
    maritals: [],
    religions: [],
    castes: [],
    physicalStatuses: [],
    educations: [],
    professions: [],
    financialStatuses: [],
  });
  

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          maritalsRes,
          religionsRes,
          castesRes,
          physicalStatusRes,
          educationRes,
          professionRes,
          financialStatusRes,
        ] = await Promise.all([
          axiosInstance.get(requests.getMarital),
          axiosInstance.get(requests.getReligion),
          axiosInstance.get(requests.getCast),
          axiosInstance.get(requests.fetchPhysicalStatus),
          axiosInstance.get(requests.Education),
          axiosInstance.get(requests.Employement),
          axiosInstance.get(requests.Income),
        ]);
        console.log("API Endpoints:", requests);


        console.log(maritalsRes);
        console.log(religionsRes);
        console.log(castesRes);
        console.log(physicalStatusRes);
        console.log(educationRes);
        console.log(professionRes);
        console.log(financialStatusRes);

        setOptions({
          maritals: maritalsRes.data || [],
          religions: religionsRes.data || [],
          castes: castesRes.data || [],
          physicalStatuses: physicalStatusRes.data || [],
          educations: educationRes.data || [],
          professions: professionRes.data || [],
          financialStatuses: financialStatusRes.data || [],
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
  

  return (
    <>
      {activeFilter === "filter" && (
        <>
          <div className="space-y-4">
            <FilterItem
              icon={<RiHeartsFill />}
              title="Marital Status"
              value={maritalStatus}
              options={options.maritals}
              onChange={setMaritalStatus}
            />

            <FilterItem
              icon={<FaUsers />}
              title="Religion"
              value={religionsPreference}
              options={options.religions}
              onChange={(value) => {
                setReligionsPreference(value);
                setSelectedReligion(value);
              }}
            />

            <FilterItem
              icon={<FaUsers />}
              title="Caste"
              value={castPreference}
              options={options.castes}
              onChange={setCastPreference}
            />

            <FilterItem
              icon={<BiBody />}
              title="Physical Status"
              value={physicalStatus}
              options={options.physicalStatuses}
              onChange={setPhysicalStatus}
            />

            <FilterItem
              icon={<FaGraduationCap />}
              title="Education"
              value={educationPreference}
              options={options.educations}
              onChange={setEducationPreference}
            />

            <FilterItem
              icon={<FaBriefcase />}
              title="Profession"
              value={professionPreference}
              options={options.professions}
              onChange={setProfessionPreference}
            />

            <FilterItem
              icon={<FaMoneyBillWave />}
              title="Financial Status"
              value={incomePreference}
              options={options.financialStatuses}
              onChange={setIncomePreference}
            />
          </div>

          {/* Range Sliders */}
          <div className="space-y-6 mt-4">
            <div className="flex gap-6 mt-4">
              <div className="flex-1">
                <RangeSlider
                  title="Weight"
                  range={filters.weight}
                  unit="Kg"
                  icon={<FaDumbbell />}
                />
              </div>
              <div className="flex-1">
                <RangeSlider
                  title="Age"
                  range={filters.age}
                  unit="yrs"
                  icon={<BiWorld />}
                />
              </div>
            </div>

            <RangeSlider
              title="Height"
              range={filters.height}
              unit="cm"
              icon={<BiBody />}
            />
          </div>

          {/* Location & Distance Buttons */}
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

          {/* Location Filters */}
          {activeLocation === "location" && (
            <div className="space-y-4">
              <FilterItem icon={<MdLocationOn />} title="Home District" />
              <FilterItem icon={<MdLocationOn />} title="Present Country" />
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
