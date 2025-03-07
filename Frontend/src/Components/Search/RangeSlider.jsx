import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

function RangeSlider({ title, range, unit, icon, minValue, maxValue, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-black text-xl">{icon}</span>
        <span className="text-black font-semibold">{title}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {range.min} {unit}
        </span>
        <span>-</span>
        <span>
          {range.max} {unit}
        </span>
      </div>
      <InputRange
        minValue={minValue}
        maxValue={maxValue}
        value={range}
        onChange={(value) => onChange({ min: value.min, max: value.max })}
      />
    </div>
  );
}

export default RangeSlider;
