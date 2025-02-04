import { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function SecondaryNumberModal({
  openModal,
  setOpenModal,
  setSecondaryNumber,
}) {
  const [secondaryNumber, setSecondaryNumberInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!secondaryNumber) return;
    
    setLoading(true);
    try {
      const response = await axiosInstance.patch(
        `${requests.editNumber}`, 
        { secondary_mobileno: secondaryNumber },
      );

      if (response.status === 200) {
        setSecondaryNumber(secondaryNumber);
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error updating secondary number:", error);
    } finally {
      setLoading(false);
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

        <h2 className="text-xl font-semibold mb-4">Enter Secondary Number</h2>

        {/* Secondary Number Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Secondary Number
          </label>
          <input
            type="text"
            value={secondaryNumber}
            onChange={(e) => setSecondaryNumberInput(e.target.value)}
            className="appearance-none block w-full text-gray-700 bg-gray-200 border
          border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter Secondary Number"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-button text-white hover:bg-emerald-700"
            }`}
            disabled={!secondaryNumber || loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}