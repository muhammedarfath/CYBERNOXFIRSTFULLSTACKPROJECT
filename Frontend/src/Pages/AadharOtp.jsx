import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProofFile from "../Components/Section/BasicDetailsSec/ProofFile";
import OtpField from "../Components/Section/BasicDetailsSec/OtpField";
import requests from "../lib/urls";
import axiosInstance from "../axios";
import Aadhaar from "../Components/Aadhaar/Aadhaar";
import Swal from "sweetalert2";

function AadharOtp() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState(null);
  const [referenceId, setReferenceId] = useState(null);
  const [aadhaarData, setAadhaarData] = useState(null);
  const navigate = useNavigate();


  const handleAadharChange = (e) => setAadharNumber(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);

    const previews = selectedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(previews).then((images) => setPreview(images));
  };

  const handleSendOtp = async () => {
    if (!aadharNumber.trim() && file?.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Please enter Aadhaar number or upload an identity proof.",
      });
      return;
    }
  

    const formData = new FormData();
    if (aadharNumber.trim().length === 12) {
      formData.append("aadhaar_number", aadharNumber);
    } else if (file?.length > 0) {
      file.forEach((f, index) => {
        formData.append(`file_1`, f); 
      });
    }
  
    try {
      const response = await axiosInstance.post(`${requests.SendOtp}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        if (aadharNumber.trim().length === 12) {
          setReferenceId(response.data.result.data.reference_id);
          setOtpSent(true);
        } else {
          Swal.fire({
            icon: "info",
            title: "Verification in Progress",
            text: "Your verification details have been submitted. It will be completed in 2 working days.",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/pricing"); 
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to send OTP. Please try again.",
      });
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
          preview={preview}
          handleFileChange={handleFileChange}
        />
        

        <OtpField
          otpSent={otpSent}
          handleSendOtp={handleSendOtp}
          handleOtpChange={handleOtpChange}
          otp={otp}
          referenceId={referenceId}
          setAadhaarData={setAadhaarData}
        />
      </form>

      <div className="mt-9">
        {aadhaarData && <Aadhaar data={aadhaarData} />}
      </div>

      {/* Centered Button */}
      {aadhaarData && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-button px-6 py-3 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={() => navigate("/pricing")}
          >
            Go To Home
          </button>
        </div>
      )}
    </div>
  );
}

export default AadharOtp;
