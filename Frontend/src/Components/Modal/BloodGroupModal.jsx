import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function BloodGroupModal({ open, setOpen, setBloodGroup }) {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bloodGroupOptions, setBloodGroupOptions] = useState([]);

  useEffect(() => {
    if (open) {
      fetchBloodGroupOptions();
    }
  }, [open]);

  const fetchBloodGroupOptions = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axiosInstance.get(requests.fetchBloodGroupOptions);  // Replace with your API endpoint
      if (response.status === 200) {
        setBloodGroupOptions(response.data.options); // Assuming response contains an "options" array
      }
    } catch (error) {
      setError("Failed to fetch blood group options. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedBloodGroup) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(`${requests.editBloodGroup}`, {
        blood_group: selectedBloodGroup,
      });

      if (response.status === 200) {
        setBloodGroup(selectedBloodGroup);
        setOpen(false);
        setSelectedBloodGroup("");
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

        <h2 className="text-xl font-semibold mb-4">Blood Group</h2>

        <select
          value={selectedBloodGroup}
          onChange={(e) => setSelectedBloodGroup(e.target.value)}
          className="block w-full text-gray-700 bg-gray-200 border border-gray-300 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={loading}
        >
          <option value="">Select Blood Group</option>
          {bloodGroupOptions.map((bloodGroup) => (
            <option key={bloodGroup.id} value={bloodGroup.name}>
              {bloodGroup.name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-full transition ${
              selectedBloodGroup ? "bg-button text-white hover:bg-green-700" : "bg-button text-white cursor-not-allowed"
            }`}
            disabled={!selectedBloodGroup || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
