import React from "react";
import { BiChevronDown } from "react-icons/bi";

function FilterItem({ icon, title, value, options = [], onChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center items-start justify-between p-4 border-b">
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <span className="text-emerald-600 md:text-xl text-3xl">{icon}</span>
        <span className="text-black  ">{title}</span>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-emerald-600 font-semibold">{value}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        >
          <option value="" className="text-gray-400 bg-white ">
            Select {title}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option.id || option.name}
              className="text-gray-700 bg-white hover:bg-emerald-100"
            >
              {option.status ||
                option.highest_education ||
                option.name ||
                option.employed_in ||
                option.annual_income}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterItem;
