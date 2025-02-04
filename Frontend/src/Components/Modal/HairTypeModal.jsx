import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function HairTypeModal({ open, setOpen, setHairType }) {
  const [selectedHairType, setSelectedHairType] = useState("");
  const [hairTypeOptions, setHairTypeOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const fetchHairTypeOptions = async () => {
      try {
        const response = await axiosInstance.get(requests.getHairTypeOptions);
        if (response.status === 200) {
          setHairTypeOptions(response.data.options);
        }
      } catch (err) {
        setError("Failed to fetch hair type options.");
      }
    };

    fetchHairTypeOptions();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!selectedHairType) return; // Use correct state name

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(requests.editHairType, {
        hair_type: selectedHairType, // Correct API key
      });

      if (response.status === 200) {
        setHairType(selectedHairType);
        setOpen(false);
        setSelectedHairType("");
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

        <h2 className="text-xl font-semibold mb-4">Hair Type</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedHairType}
            onChange={(e) => setSelectedHairType(e.target.value)}
            className="block w-full text-gray-700 bg-gray-200 border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
            disabled={loading}
          >
            <option value="">Select Hair Type</option>
            {hairTypeOptions.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 rounded-full transition ${
                selectedHairType
                  ? "bg-button text-white hover:bg-green-700"
                  : "bg-button text-white cursor-not-allowed"
              }`}
              disabled={!selectedHairType || loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
