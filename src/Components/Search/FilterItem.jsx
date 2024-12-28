import React from 'react'

function FilterItem({ icon, title, value }) {
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 text-xl">{icon}</span>
          <span className="text-gray-600">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">{value}</span>
          <span className="text-gray-400">›</span>
        </div>
      </div>
    );
  }
export default FilterItem
