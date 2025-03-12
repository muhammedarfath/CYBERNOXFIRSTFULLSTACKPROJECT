import React from "react";

function FilterItem({ icon, title, value, options = [], onChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <span className="text-emerald-600 text-xl">{icon}</span>
        <span className="text-gray-600">{title}</span>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-emerald-600 font-semibold">{value}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white border border-emerald-400 rounded-lg px-3 py-1 text-gray-600 focus:outline-none cursor-pointer shadow-sm transition-all w-full sm:w-auto"
        >
          <option value="" className="text-gray-400 bg-white">
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