import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";  // Your axios instance
import requests from "../../lib/urls";  // Your requests

import { MdClose, MdCheckBox, MdCheckBoxOutlineBlank, MdSearch } from "react-icons/md";

function ProfessionModal({ open, setOpen, setProfessionPreference }) {
  const [search, setSearch] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [error, setError] = useState("");
  const [professionOptions, setProfessionOptions] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchProfessionOptions = async () => {
        setError("");  // Reset the error state
        try {
          const response = await axiosInstance.get(requests.Employement); 
          if (response.status === 200) {
            setProfessionOptions(response.data || []);
          } else {
            setError("Failed to fetch options.");
          }
        } catch (error) {
          setError("An error occurred while fetching options.");
        }
      };

      fetchProfessionOptions();
    }
  }, [open]);

  // Filter the profession options based on the search input
  const filteredOptions = professionOptions.filter((option) =>
    option.employed_in.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle selected preferences
  const handleToggle = (preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };

  // Close the modal
  const onClose = () => {
    setOpen(false);
  };

  // Save the selected profession preferences to the backend
  const onSave = async () => {
    try {
      const selectedIds = professionOptions
        .filter(option => selectedPreferences.includes(option.employed_in))
        .map(option => option.id); // Get the IDs of selected preferences

      await axiosInstance.post(`${requests.UpdatePartner}`, {
        profession: selectedIds,  // Send the selected profession IDs to the backend
      });

      if (typeof setProfessionPreference === "function") {
        setProfessionPreference(selectedPreferences.join(", "));
      } else {
        console.warn("setProfessionPreference is not a function");
      }

      onClose();
    } catch (error) {
      console.error("Error saving profession preferences:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-button text-white rounded-full"
        >
          <MdClose className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6">
          <h2 className="text-xl font-semibold">Select Profession</h2>
        </div>

        {/* Selected Options Display */}
        {selectedPreferences.length > 0 && (
          <div className="px-6 flex flex-wrap gap-2">
            {selectedPreferences.map((preference) => (
              <div
                key={preference}
                className="inline-flex items-center bg-button text-white px-4 py-2 rounded-full text-sm"
              >
                {preference}
                <button
                  onClick={() => handleToggle(preference)}
                  className="ml-2 hover:opacity-75"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="p-6">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search profession"
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
                  selectedPreferences.includes(option.employed_in)
                    ? "bg-button text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleToggle(option.employed_in)}
              >
                <div className="flex-shrink-0">
                  {selectedPreferences.includes(option.employed_in) ? (
                    <div className="w-6 h-6 border-2 border-button rounded flex items-center justify-center bg-button">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-button rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-button" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{option.employed_in}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 flex justify-between items-center border-t">
          <button onClick={onClose} className="px-6 py-2 text-button">
            Back
          </button>
          <button
            onClick={onSave}
            className="px-8 py-2 bg-button text-white rounded-full hover:bg-gray-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfessionModal;
