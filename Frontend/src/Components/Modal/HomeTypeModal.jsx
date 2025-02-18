import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function HomeTypeModal({ open, setOpen, setHomeType }) {
  const [selectedHomeType, setSelectedHomeType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [homeTypeOptions, setHomeTypeOptions] = useState([]);

  useEffect(() => {
    if (!open) return;

    const fetchHomeTypeOptions = async () => {
      try {
        const response = await axiosInstance.get(requests.getHomeTypeOptions);
        if (response.status === 200 && response.data.options) {
          setHomeTypeOptions(response.data.options);
        } else {
          setError("No home type options found.");
        }
      } catch (err) {
        setError("Failed to fetch home type options.");
      }
    };

    fetchHomeTypeOptions();
  }, [open]);

  const handleSave = async () => {
    if (!selectedHomeType) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(requests.editHomeType, {
        home_type: selectedHomeType,
      });

      if (response.status === 200) {
        setHomeType(selectedHomeType);
        setOpen(false);
        setSelectedHomeType("");
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

        <h2 className="text-xl font-semibold mb-4">Home Type</h2>

        <select
          value={selectedHomeType}
          onChange={(e) => setSelectedHomeType(e.target.value)}
          className="appearance-none block w-full text-gray-700 bg-gray-200 border
          border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={loading}
        >
          <option value="">Select Home Type</option>
          {homeTypeOptions.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-full transition ${
              selectedHomeType
                ? "bg-button text-white hover:bg-green-700"
                : "bg-button text-white cursor-not-allowed"
            }`}
            disabled={!selectedHomeType || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
