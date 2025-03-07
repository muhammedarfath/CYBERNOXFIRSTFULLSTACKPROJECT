import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import FilterOption from "./FilterOption";
import SearchFilter from "./SearchFilter";
import requests from "../../lib/urls";
import axiosInstance from "../../axios";
import SearchRes from "./SearchRes";

function SearchSec() {
  const [profileId, setProfileId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("filter");
  const [activeLocation, setActiveLocation] = useState("location");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [maritalStatus, setMaritalStatus] = useState("");
  const [physicalStatus, setPhysicalStatus] = useState("");
  const [educationPreference, setEducationPreference] = useState("");
  const [professionPreference, setProfessionPreference] = useState("");
  const [incomePreference, setIncomePreference] = useState("");
  const [religionsPreference, setReligionsPreference] = useState("");
  const [castPreference, setCastPreference] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");


  console.log(maritalStatus,"this is marital status");



  const [rangeFilters, setRangeFilters] = useState({
    weight: { min: 40, max: 100 },
    age: { min: 18, max: 50 },
    height: { min: 140, max: 200 },
  });
  



  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      let response;

      if (activeFilter === "search") {

        if (!profileId) {
          alert("Please enter a Profile ID!");
          setLoading(false);
          return;
        }

        response = await axiosInstance.get(
          `${requests.Search}?profileId=${profileId}`
        );
      } else {
        const params = {
          country: selectedCountry || undefined,
          state: selectedState || undefined,
          marital_status: maritalStatus || undefined,
          physical_status: physicalStatus || undefined,
          education: educationPreference || undefined,
          profession: professionPreference || undefined,
          income: incomePreference || undefined,
          religion: religionsPreference || undefined,
          caste: castPreference || undefined,
          weight: `${rangeFilters.weight.min}-${rangeFilters.weight.max}`,
          height: `${rangeFilters.height.min}-${rangeFilters.height.max}`,
          age: `${rangeFilters.age.min}-${rangeFilters.age.max}`,
        };

        response = await axiosInstance.get(`${requests.Search}`, { params });
      }

      console.log(response, "search");
      setUserData(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          alert("No matching results found.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }

      setError("User not found or error occurred.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative h-full overflow-scroll bg-gray-100">
      <div className="m-5 hidden md:block">
        <Link to="/">
          <button className="bg-button flex items-center gap-3 p-2 px-5 mb-4 rounded-xl text-white">
            <FaLeftLong />
            Back
          </button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg mb-16">
        <div className="flex gap-3 mb-4">
          <button
            className={`px-6 py-2 rounded-xl text-white ${
              activeFilter === "filter" ? "bg-button" : "bg-gray"
            }`}
            onClick={() => {
              setActiveFilter("filter");
              setUserData(null);
              setProfileId("");
            }}
          >
            Filter
          </button>
          <button
            className={`px-6 py-2 rounded-xl text-white ${
              activeFilter === "search" ? "bg-button" : "bg-gray"
            }`}
            onClick={() => {
              setActiveFilter("search");
              setUserData(null);
              setProfileId("");
            }}
          >
            ID Search
          </button>
        </div>

        <FilterOption
          activeFilter={activeFilter}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          maritalStatus={maritalStatus}
          setMaritalStatus={setMaritalStatus}
          physicalStatus={physicalStatus}
          setPhysicalStatus={setPhysicalStatus}
          educationPreference={educationPreference}
          setEducationPreference={setEducationPreference}
          professionPreference={professionPreference}
          setProfessionPreference={setProfessionPreference}
          incomePreference={incomePreference}
          setIncomePreference={setIncomePreference}
          religionsPreference={religionsPreference}
          setReligionsPreference={setReligionsPreference}
          castPreference={castPreference}
          setCastPreference={setCastPreference}
          selectedReligion={selectedReligion}
          setSelectedReligion={setSelectedReligion}
          rangeFilters={rangeFilters}
          setRangeFilters={setRangeFilters}
        />

        <SearchFilter
          activeFilter={activeFilter}
          profileId={profileId}
          setProfileId={setProfileId}
        />

        <button
          className="left-0 w-full right-0 bg-button text-white py-4 rounded-xl mt-3 flex items-center justify-center gap-2 shadow-md"
          onClick={handleSearch}
        >
          <CgSearch className="w-5 h-5" />
          Search
        </button>

        <SearchRes loading={loading} userData={userData} />
      </div>
    </div>
  );
}

export default SearchSec;
