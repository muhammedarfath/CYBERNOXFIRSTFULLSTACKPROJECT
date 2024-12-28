import React from 'react'
import { TbChevronRight } from "react-icons/tb";

function PhysicalDetails() {
  const details = [
    { label: 'Height', value: '156 cm (5\'2")' },
    { label: 'Weight', value: '50 Kg' },
    { label: 'Skin Color', value: 'Add Skin Color', isAction: true },
    { label: 'Blood Group', value: 'Add Blood Group', isAction: true },
    { label: 'Body type', value: 'Athletic' },
    { label: 'Hair Color', value: 'Add Hair Color', isAction: true },
    { label: 'Hair Type', value: 'Add Hair Type', isAction: true },
    { label: 'Facial Hair', value: 'Add Facial Hair', isAction: true },
    { label: 'Eye Color', value: 'Add Eye Color', isAction: true },
    { label: 'Eye Wear', value: 'Add Eye Wear', isAction: true },
    { label: 'Appearance', value: 'Add Appearance', isAction: true }
  ]

  return (
    <div className="w-full mx-auto p-3">
      <h1 className="text-2xl font-bold mb-6">Physical & Appearance Details</h1>
      
      <div className="space-y-1">
        {details.map((detail, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <span className="text-gray-700 text-lg">{detail.label}</span>
            <div className="flex items-center">
              <span className={detail.isAction ? 'text-primary2' : 'text-gray-900'}>
                {detail.value}
              </span>
              <TbChevronRight className="ml-2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhysicalDetails

