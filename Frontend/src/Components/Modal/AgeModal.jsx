import {
  MdClose,
  MdSearch,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import React, { useState } from "react";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

function AgeModal({ open, setOpen, setAgePreference }) {
  const [search, setSearch] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const ageOptions = [
    { id: 1, range: "18-25" },
    { id: 2, range: "26-30" },
    { id: 3, range: "31-35" },
    { id: 4, range: "36-40" },
    { id: 5, range: "41-50" },
    { id: 6, range: "51-60" },
    { id: 7, range: "61-70" },
    { id: 8, range: "71-80" },
    { id: 9, range: "81+" },
  ];

  const filteredOptions = ageOptions.filter((option) =>
    option.range.includes(search)
  );

  const handleToggle = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = async () => {
    try {
      const response = await axiosInstance.post(`${requests.UpdatePartner}`, {
        age_preference: selectedValues.join(", "),
      });
      setAgePreference(selectedValues.join(", "));
      onClose();
    } catch (error) {
      console.error("Error saving age preference:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg relative md:max-h-[90vh] max-h-[70vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-button text-white rounded-full"
        >
          <MdClose className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-4 md:p-6">
          <h2 className="text-xl font-semibold">Select Age Range</h2>
        </div>

        {/* Selected Options Display */}
        {selectedValues.length > 0 && (
          <div className="px-4 md:px-6 flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <div
                key={value}
                className="inline-flex items-center bg-button text-white px-4 py-2 rounded-full text-sm"
              >
                {value}
                <button
                  onClick={() => handleToggle(value)}
                  className="ml-2 hover:opacity-75"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="p-4 md:p-6">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search age range"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border border-gray focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="mt-4 space-y-4">
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${
                  selectedValues.includes(option.range)
                    ? "bg-button text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleToggle(option.range)}
              >
                <div className="flex-shrink-0">
                  {selectedValues.includes(option.range) ? (
                    <div className="w-6 h-6 border-2 border-button rounded flex items-center justify-center bg-button">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-button rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-button" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{option.range}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 flex justify-between items-center border-t">
          <button onClick={onClose} className="px-4 py-2 text-button md:px-6">
            Back
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-button text-white rounded-full hover:bg-gray-800 md:px-8"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgeModal;