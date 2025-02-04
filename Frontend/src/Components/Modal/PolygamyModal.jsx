import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export function PolygamyModal({ open, setOpen, setPolygamy }) {
  const [selectedPolygamy, setSelectedPolygamy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [polygamyOptions, setPolygamyOptions] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchPolygamyOptions = async () => {
        setError("");
        try {
          const response = await axiosInstance.get(
            requests.fetchPolygamyOptions
          );
          if (response.status === 200) {
            setPolygamyOptions(response.data.options || []);
          } else {
            setError("Failed to fetch options.");
          }
        } catch (error) {
          setError("An error occurred while fetching options.");
        }
      };

      fetchPolygamyOptions();
    }
  }, [open]);

  const handleSave = async () => {
    if (!selectedPolygamy) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(requests.editPolygamy, {
        polygamy: selectedPolygamy,
      });

      if (response.status === 200) {
        setPolygamy(selectedPolygamy);
        setOpen(false);
        setSelectedPolygamy("");
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

        <h2 className="text-xl font-semibold mb-4">Polygamy Preference</h2>

        <select
          value={selectedPolygamy}
          onChange={(e) => setSelectedPolygamy(e.target.value)}
          className="appearance-none block w-full text-gray-700 bg-gray-200 border
          border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={loading}
        >
          <option value="">Select Preference</option>
          {polygamyOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-full transition ${
              selectedPolygamy
                ? "bg-button text-white hover:bg-green-700"
                : "bg-button text-white cursor-not-allowed"
            }`}
            disabled={!selectedPolygamy || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
