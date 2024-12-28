import React from "react";
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


function FilterOption({activeFilter,filters,activeLocation,setActiveLocation}) {
  return (
    <>
      {activeFilter === "filter" && (
        <>
          <div className="space-y-4">
            <FilterItem
              icon={<RiHeartsFill />}
              title="Marital Status"
              value="Never Married"
            />
            <FilterItem icon={<FaUsers />} title="Community" value="Any" />
            <FilterItem
              icon={<BiBody />}
              title="Physical Status"
              value="No Health Issues"
            />
            <FilterItem
              icon={<FaGraduationCap />}
              title="Education"
              value="Any"
            />
            <FilterItem icon={<FaBriefcase />} title="Profession" value="Any" />
            <FilterItem
              icon={<FaUserTie />}
              title="Profession Type"
              value="Any"
            />
            <FilterItem
              icon={<FaMoneyBillWave />}
              title="Financial Status"
              value="Any"
            />
          </div>

          <div className="space-y-6 mt-4">
            <RangeSlider
              title="Weight"
              range={filters.weight}
              unit="Kg"
              icon={<FaDumbbell />}
            />
            <RangeSlider
              title="Age"
              range={filters.age}
              unit="yrs"
              icon={<BiWorld />}
            />
            <RangeSlider
              title="Height"
              range={filters.height}
              unit="cm"
              icon={<BiBody />}
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
                value="Any"
              />
              <FilterItem
                icon={<MdLocationOn />}
                title="Present Country"
                value="Any"
              />
            </div>
          )}

          {activeLocation === "distance" && (
            <div className="space-y-4">
              <FilterItem
                icon={<MdLocationOn />}
                title="Distance"
                value="Any"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FilterOption;
