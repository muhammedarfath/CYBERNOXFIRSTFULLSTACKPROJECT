import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function LivingSituationModal({
  open,
  setOpen,
  setLivingSituation,
}) {
  const [selectedLivingSituation, setSelectedLivingSituation] = useState("");
  const [livingSituationOptions, setLivingSituationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const fetchLivingSituationOptions = async () => {
      try {
        const response = await axiosInstance.get(
          requests.getLivingSituationOptions
        );
        if (response.status === 200) {
          setLivingSituationOptions(response.data.options);
        }
      } catch (err) {
        setError("Failed to fetch living situation options.");
      }
    };

    fetchLivingSituationOptions();
  }, [open]);

  const handleSave = async () => {
    if (!selectedLivingSituation) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(requests.editLivingSituation, {
        living_situation: selectedLivingSituation,
      });

      if (response.status === 200) {
        setLivingSituation(selectedLivingSituation);
        setOpen(false);
        setSelectedLivingSituation("");
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

        <h2 className="text-xl font-semibold mb-4">Living Situation</h2>

        <select
          value={selectedLivingSituation}
          onChange={(e) => setSelectedLivingSituation(e.target.value)}
          className="appearance-none block w-full text-gray-700 bg-gray-200 border
          border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={loading || livingSituationOptions.length === 0}
        >
          <option value="">Select Living Situation</option>
          {livingSituationOptions.map((option) => (
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
              selectedLivingSituation
                ? "bg-button text-white hover:bg-green-700"
                : "bg-button text-white cursor-not-allowed"
            }`}
            disabled={!selectedLivingSituation || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
