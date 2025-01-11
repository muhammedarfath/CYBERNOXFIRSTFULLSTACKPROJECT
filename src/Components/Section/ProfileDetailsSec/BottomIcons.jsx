import React from 'react'
import { FaStar, FaTimes, FaCheck } from 'react-icons/fa'

function BottomIcons() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[300px] h-[150px] mt-5">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
          <FaStar className="h-8 w-8 text-white" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
          <div className="h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
            <FaTimes className="h-8 w-8 text-white" />
          </div>
          
          <div className="h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
            <FaCheck className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
      <h2 className="text-md font-light">Hide and Report</h2>
    </div>
  )
}

export default BottomIcons

