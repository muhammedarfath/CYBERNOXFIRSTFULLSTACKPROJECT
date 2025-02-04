import axios from "axios";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";

export default function TimeToCallModal({
  openModal,
  setOpenModal,
  setTimeToCall,
}) {
  const [time, setTime] = useState("");

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(`${requests.editTimeToCall}`, {
        time_to_call: time,
      });

      if (response.status === 200) {
        setTimeToCall(time);
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Failed to update time to call", error);
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

        <h2 className="text-xl font-semibold mb-4">Enter Time to Call</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Time
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="appearance-none block w-full text-gray-700 bg-gray-200 border
          border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter Preferred Time to Call"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-button text-white rounded-full hover:bg-emerald-700"
            disabled={!time}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
