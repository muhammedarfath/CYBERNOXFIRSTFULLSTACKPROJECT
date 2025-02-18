import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function LocationModal({
  openModal,
  setOpenModal,
  fetchDetails,
  setLocation,
}) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity("");
    }
  }, [selectedState]);

  const handleSave = async () => {
    const countryName = countries.find(
      (c) => c.isoCode === selectedCountry
    )?.name;
    const stateName = states.find((s) => s.isoCode === selectedState)?.name;

    const data = {
      country: countryName || "",
      state: stateName || "",
      city: selectedCity || "",
    };

    try {
      const { data: responseData } = await axiosInstance.put(
        requests.editLocation,
        data
      );

      const { updated_location } = responseData;
      if (updated_location) {
        const { city, state, country } = updated_location;
        setLocation(`${city}, ${state}, ${country}`);
      }
      
      fetchDetails();
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative p-6">
        {/* Close Button */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
        >
          <MdClose className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Select Location</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="appearance-none p-2 rounded-md block w-full bg-gray-200 text-gray-700 border 
              border-gray focus:outline-none"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCountry && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="appearance-none p-2 rounded-md block w-full bg-gray-200 text-gray-700 border 
              border-gray focus:outline-none"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* City Dropdown */}
        {selectedState && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none p-2 rounded-md block w-full bg-gray-200 text-gray-700 border 
              border-gray focus:outline-none"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-button text-white rounded-full hover:bg-emerald-700"
            disabled={!selectedCity}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
