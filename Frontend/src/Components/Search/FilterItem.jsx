import React from "react";

function FilterItem({ icon, title, value, options = [], onChange }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <span className="text-emerald-600 text-xl">{icon}</span>
        <span className="text-gray-600">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-emerald-600">{value}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-gray-400 cursor-pointer"
        >
          <option value="">Select {title}</option>
          {options.map((option, index) => (
            <option
              key={index.id}
              value={
                option.id
              }
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
