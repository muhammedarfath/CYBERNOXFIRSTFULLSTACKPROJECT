import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";
import { MdClose, MdCheckBox, MdCheckBoxOutlineBlank, MdSearch } from "react-icons/md";

function MaritalModal({ open, setOpen, setMaritalStatus }) {
  const [search, setSearch] = useState("");
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState([]);
  const [error, setError] = useState("");
  const [maritalTypeStatus, setMaritalTypeStatus] = useState([]);



  useEffect(() => {
    if (open) {
      const fetchMaritalOptions = async () => {
        setError("");
        try {
          const response = await axiosInstance.get(requests.getMarital);
          console.log(response.data);
          if (response.status === 200) {
            setMaritalTypeStatus(response.data || []);
          } else {
            setError("Failed to fetch options.");
          }
        } catch (error) {
          setError("An error occurred while fetching options.");
        }
      };

      fetchMaritalOptions();
    }
  }, [open]);



  const filteredOptions = maritalTypeStatus.filter((option) =>
    option.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (status) => {
    setSelectedMaritalStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = async () => {
    try {
      const selectedIds = maritalTypeStatus
        .filter(option => selectedMaritalStatuses.includes(option.status))
        .map(option => option.id); 
  
      const response = await axiosInstance.post(`${requests.UpdatePartner}`, {
        marital_status: selectedIds, 
      });
  
      setMaritalStatus(selectedMaritalStatuses.join(", ")); 
      onClose();
    } catch (error) {
      console.error("Error saving marital status:", error);
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
          <h2 className="text-xl font-semibold">Select Marital Status</h2>
        </div>

        {/* Selected Options Display */}
        {selectedMaritalStatuses.length > 0 && (
          <div className="px-6 flex flex-wrap gap-2">
            {selectedMaritalStatuses.map((status) => (
              <div
                key={status}
                className="inline-flex items-center bg-button text-white px-4 py-2 rounded-full text-sm"
              >
                {status}
                <button
                  onClick={() => handleToggle(status)}
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
              placeholder="Search marital status"
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
                  selectedMaritalStatuses.includes(option.status)
                    ? "bg-button text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleToggle(option.status)}
              >
                <div className="flex-shrink-0">
                  {selectedMaritalStatuses.includes(option.status) ? (
                    <div className="w-6 h-6 border-2 border-button rounded flex items-center justify-center bg-button">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-button rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-button" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{option.status}</span>
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

export default MaritalModal;
