import React, { useEffect, useState } from "react";
import { MdClose, MdCheckBox, MdCheckBoxOutlineBlank, MdSearch } from "react-icons/md";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import axios from "axios";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

function MotherTongueModal({ open, setOpen, setMotherTongueStatus }) {
  const [search, setSearch] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [error, setError] = useState("");
  const [motherTongueOptions, setMotherTongueOptions] = useState([]);

  useEffect(() => {
    if (open) {
      try {
        const allLanguages = languages.getNames("en", en);
        const formattedLanguages = Object.keys(allLanguages).map((key) => ({
          id: key,
          name: allLanguages[key],
        }));
        
        setMotherTongueOptions(formattedLanguages);
      } catch (error) {
        setError("An error occurred while loading language options.");
      }
    }
  }, [open]);

  const filteredOptions = motherTongueOptions.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = async () => {
    try {
      const selectedIds = motherTongueOptions
        .filter((option) => selectedPreferences.includes(option.name))
        .map((option) => option.name);

      const response = await axiosInstance.post(`${requests.UpdatePartner}`, {
        mother_tongue: selectedIds, 
      });
      if (response.status === 200) {
        setMotherTongueStatus(selectedPreferences.join(", "));
        onClose();
      } else {
        setError("Failed to save preferences.");
      }
    } catch (error) {
      console.error("Error saving mother tongue preferences:", error);
      setError("An error occurred while saving preferences.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg relative  overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-button text-white rounded-full"
        >
          <MdClose className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">Select Mother Tongue</h2>
        </div>

        {selectedPreferences.length > 0 && (
          <div className="px-4 flex flex-wrap gap-2">
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

        <div className="p-4">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search mother tongue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border border-gray focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="mt-4 space-y-4 h-[30vh] overflow-y-auto"> 
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${
                  selectedPreferences.includes(option.name)
                    ? "bg-button text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleToggle(option.name)}
              >
                <div className="flex-shrink-0">
                  {selectedPreferences.includes(option.name) ? (
                    <div className="w-6 h-6 border-2 border-button rounded flex items-center justify-center bg-button">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-button rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-button" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{option.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-between items-center border-t">
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

export default MotherTongueModal;
