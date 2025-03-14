import {
  MdClose,
  MdSearch,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import React, { useState } from "react";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

function HeightModal({ open, setOpen, setHeightPreference }) {
  const [search, setSearch] = useState("");
  const [selectedHeights, setSelectedHeights] = useState([]);

  // Predefined height options in cm (example range)
  const heightOptions = [
    { id: 1, height: "150 cm" },
    { id: 2, height: "160 cm" },
    { id: 3, height: "170 cm" },
    { id: 4, height: "180 cm" },
    { id: 5, height: "190 cm" },
    { id: 6, height: "200 cm" },
  ];

  const filteredOptions = heightOptions.filter((option) =>
    option.height.includes(search)
  );

  const handleToggle = (height) => {
    setSelectedHeights((prev) =>
      prev.includes(height)
        ? prev.filter((item) => item !== height)
        : [...prev, height]
    );
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = async () => {
    try {
      const response = await axiosInstance.post(`${requests.UpdatePartner}`, {
        height_preference: selectedHeights.join(", "), // Save as comma-separated list
      });
      setHeightPreference(selectedHeights.join(", "));
      onClose();
    } catch (error) {
      console.error("Error saving height preference:", error);
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
          <h2 className="text-xl font-semibold">Select Height (in cm)</h2>
        </div>

        {/* Selected Options Display */}
        {selectedHeights.length > 0 && (
          <div className="px-4 md:px-6 flex flex-wrap gap-2">
            {selectedHeights.map((height) => (
              <div
                key={height}
                className="inline-flex items-center bg-button text-white px-4 py-2 rounded-full text-sm"
              >
                {height}
                <button
                  onClick={() => handleToggle(height)}
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
              placeholder="Search height"
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
                  selectedHeights.includes(option.height)
                    ? "bg-button text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleToggle(option.height)}
              >
                <div className="flex-shrink-0">
                  {selectedHeights.includes(option.height) ? (
                    <div className="w-6 h-6 border-2 border-button rounded flex items-center justify-center bg-button">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-button rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-button" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{option.height}</span>
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

export default HeightModal;