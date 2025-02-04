import { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function JobExperienceModal({ open, setOpen, setExperience }) {
  const [experience, setExperienceInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!experience) return;

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.patch(`${requests.editExperience}`, {
        experience: experience,
      });

      if (response.status === 200) {
        setExperience(experience);
        setOpen(false);
        setExperienceInput(""); // Reset input after saving
      } else {
        setError("Failed to update experience. Please try again.");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      setError("An error occurred. Please try again.");
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

        <h2 className="text-xl font-semibold mb-4">Enter Job Experience</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Job Experience (in years)
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperienceInput(e.target.value)}
            className="appearance-none block w-full text-gray-700 bg-gray-200 border
          border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter job experience"
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-full transition ${
              experience
                ? "bg-button text-white hover:bg-green-700"
                : "bg-button text-white cursor-not-allowed"
            }`}
            disabled={!experience || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
