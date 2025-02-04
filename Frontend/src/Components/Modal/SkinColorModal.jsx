import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function SkinColorModal({ open, setOpen, setSkinColor }) {
  const [selectedSkinColor, setSelectedSkinColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skinColorOptions, setSkinColorOptions] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchSkinColorOptions = async () => {
        try {
          const response = await axiosInstance.get(requests.fetchSkinColorOptions);
          if (response.status === 200) {
            setSkinColorOptions(response.data.options);
          } else {
            setError("Failed to fetch skin color options.");
          }
        } catch (error) {
          setError("An error occurred while fetching skin color options.");
        }
      };

      fetchSkinColorOptions();
    }
  }, [open]); 

  const handleSave = async () => {
    if (!selectedSkinColor) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(`${requests.editSkinColor}`, {
        skin_color: selectedSkinColor,
      });

      if (response.status === 200) {
        setSkinColor(selectedSkinColor);
        setOpen(false);
        setSelectedSkinColor("");
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
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full"
          disabled={loading}
        >
          <MdClose className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Skin Color</h2>

        <select
          value={selectedSkinColor}
          onChange={(e) => setSelectedSkinColor(e.target.value)}
          className="block w-full text-gray-700 bg-gray-200 border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={loading}
        >
          <option value="">Select Skin Color</option>
          {skinColorOptions.length > 0 ? (
            skinColorOptions.map((skinColor) => (
              <option key={skinColor.id} value={skinColor.name}>
                {skinColor.name}
              </option>
            ))
          ) : (
            <option value="">No options available</option>
          )}
        </select>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-full transition ${
              selectedSkinColor ? "bg-button text-white hover:bg-green-700" : "bg-button text-white cursor-not-allowed"
            }`}
            disabled={!selectedSkinColor || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
