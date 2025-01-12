import React from "react";

function RangeSlider({ title, range, unit, icon }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-black text-xl">{icon}</span>
        <span className="text-black font-semibold">{title}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {range[0]} {unit}
        </span>
        <span>-</span>
        <span>
          {range[1]} {unit}
        </span>
      </div>
      <input
        type="range"
        className="w-full h-1 bg-button rounded-lg appearance-none cursor-pointer custom-range"
        min={range[0]}
        max={range[1]}
        defaultValue={range[0]}
      />
    </div>
  );
}

export default RangeSlider;
