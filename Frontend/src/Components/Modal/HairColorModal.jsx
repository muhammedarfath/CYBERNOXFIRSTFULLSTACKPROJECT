import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function HairColorModal({ open, setOpen, setHairColor }) {
  const [selectedHairColor, setSelectedHairColor] = useState("");
  const [hairColorOptions, setHairColorOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hair color options dynamically
  useEffect(() => {
    if (!open) return;

    const fetchHairColorOptions = async () => {
      try {
        const response = await axiosInstance.get(requests.getHairColorOptions);
        if (response.status === 200) {
          setHairColorOptions(response.data.options);
        }
      } catch (err) {
        setError("Failed to fetch hair color options.");
      }
    };

    fetchHairColorOptions();
  }, [open]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHairColor) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(`${requests.editHairColor}`, {
        hair_color: selectedHairColor,
      });

      if (response.status === 200) {
        setHairColor(selectedHairColor);
        setOpen(false);
        setSelectedHairColor("");
      } else {
        setError("Failed to update. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative p-6">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
          disabled={loading}
        >
          <MdClose className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Hair Color</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedHairColor}
            onChange={(e) => setSelectedHairColor(e.target.value)}
            className="appearance-none block w-full text-gray-700 bg-gray-200 border
            border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            disabled={loading}
          >
            <option value="">Select Hair Color</option>
            {hairColorOptions.length > 0 ? (
              hairColorOptions.map((color) => (
                <option key={color.id} value={color.name}>
                  {color.name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 rounded-full transition ${
                selectedHairColor
                  ? "bg-button text-white hover:bg-green-700"
                  : "bg-button text-white cursor-not-allowed"
              }`}
              disabled={!selectedHairColor || loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
