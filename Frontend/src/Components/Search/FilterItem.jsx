import React from 'react';

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
          onChange={e => onChange(e.target.value)}
          className="text-gray-400"
        >
          <option value="">Select {title}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterItem;
