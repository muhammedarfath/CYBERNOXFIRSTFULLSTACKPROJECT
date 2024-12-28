import React from 'react'

function RangeSlider({ title, range, unit, icon }) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-black text-xl">{icon}</span>
          <span className="text-black">{title}</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
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
export default RangeSlider
