import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProofFile from "../Components/Section/BasicDetailsSec/ProofFile";
import OtpField from "../Components/Section/BasicDetailsSec/OtpField";
import requests from "../lib/urls";
import axiosInstance from "../axios";
import Aadhaar from "../Components/Aadhaar/Aadhaar";

function AadharOtp() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [referenceId, setReferenceId] = useState(null);
  const [aadhaarData, setAadhaarData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleAadharChange = (e) => setAadharNumber(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSendOtp = async () => {
    if (aadharNumber.trim().length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${requests.SendOtp}`, {
        aadhaar_number: aadharNumber,
      });
      if (response.status === 200) {
        setReferenceId(response.data.result.data.reference_id);
        setOtpSent(true);
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div>
      <form className="w-full md:max-w-2xl bg-white rounded-lg p-6 shadow-2xl">
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <strong>Note:</strong> Aadhaar is used to verify your identity and
            fetch relevant details. Your data is secure and will not be shared
            with third parties. If you do not have an Aadhaar number, please
            upload a valid identity proof like a Driving License, Voter ID, or
            Passport.
          </p>
        </div>

        {!otpSent && (
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="aadhar"
              >
                Aadhaar Number
              </label>
              <input
                type="text"
                id="aadhar"
                placeholder="Enter Aadhaar Number"
                value={aadharNumber}
                onChange={handleAadharChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
        )}

        <ProofFile
          otpSent={otpSent}
          aadharNumber={aadharNumber}
          handleFileChange={handleFileChange}
        />

        {preview && (
          <div className="flex justify-center mb-6">
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <OtpField
          otpSent={otpSent}
          handleSendOtp={handleSendOtp}
          handleOtpChange={handleOtpChange}
          otp={otp}
          referenceId={referenceId}
          setAadhaarData={setAadhaarData}
        />
      </form>

      <div className="mt-9">{aadhaarData && <Aadhaar data={aadhaarData} />}</div>

      {/* Centered Button */}
      {aadhaarData && <div className="flex justify-center mt-6">
        <button
          className="bg-button px-6 py-3 text-white rounded-md shadow-md hover:bg-blue-600 transition"
          onClick={() => navigate("/pricing")} 
        >
          Go To Home
        </button>
      </div>}
    </div>
  );
}

export default AadharOtp;
