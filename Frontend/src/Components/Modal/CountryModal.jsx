import React, { useState } from 'react';
import { Country } from 'country-state-city';
import { MdClose, MdCheckBox, MdCheckBoxOutlineBlank, MdSearch } from 'react-icons/md';
import axiosInstance from '../../axios';
import requests from '../../lib/urls';

function CountryModal({ open, setOpen, setSelectedCountry }) {
  const [search, setSearch] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);

  // Get all countries
  const countries = Country.getAllCountries();

  // Filter countries based on the search input
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    setSelectedCountries((prevSelected) => {
      if (prevSelected.some((c) => c.name === country.name)) {
        return prevSelected.filter((c) => c.name !== country.name); // Deselect if already selected
      } else {
        return [...prevSelected, country]; // Add to selected if not already selected
      }
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSave = async () => {
    try {
      const selectedCountryIds = selectedCountries.map(country => country.name); 

      await axiosInstance.post(`${requests.UpdatePartner}`, {
        partner_country: selectedCountryIds,  
      });

      if (typeof setSelectedCountry === "function") {
        setSelectedCountry(selectedCountries);
      } else {
        console.warn("setSelectedCountry is not a function");
      }

      onClose();
    } catch (error) {
      console.error("Error saving selected countries:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-button text-white rounded-full"
        >
          <MdClose className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">Select Country</h2>
        </div>

        {/* Selected Countries Display */}
        {selectedCountries.length > 0 && (
          <div className="px-4 py-2 flex flex-wrap gap-2 border-b">
            {selectedCountries.map((country) => (
              <div
                key={country.isoCode}
                className="inline-flex items-center bg-button text-white px-4 py-2 rounded-full text-sm"
              >
                {country.name}
                <button
                  onClick={() => handleRemoveSelectedCountry(country)}
                  className="ml-2 hover:opacity-75"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-gray-50 rounded-lg border border-gray focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <label
                key={country.isoCode}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg ${
                  selectedCountries.some((c) => c.name === country.name)
                    ? 'bg-button text-white'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => handleCountrySelect(country)}
              >
                <div className="flex-shrink-0">
                  {selectedCountries.some((c) => c.name === country.name) ? (
                    <div className="w-6 h-6 border-2 border-button rounded flex items-center justify-center bg-button">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-button rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-button" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{country.name}</span>
              </label>
            ))}
          </div>
        </div>

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

export default CountryModal;
