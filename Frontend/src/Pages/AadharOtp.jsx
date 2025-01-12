import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProofFile from "../Components/Section/BasicDetailsSec/ProofFile";
import OtpField from "../Components/Section/BasicDetailsSec/OtpField";


function AadharOtp() {

  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleSendOtp = () => {
    if (aadharNumber.trim() === "") {
      alert("Please enter an Aadhaar number or upload an identity proof.");
      return;
    }
    const linkedMobile = "9999999999";
    setMobileNumber(linkedMobile);
    setOtpSent(true);
    console.log("OTP sent to: " + linkedMobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aadharNumber && !file) {
      alert("Please provide Aadhaar number or upload an identity proof.");
      return;
    }
    console.log("Form submitted", { aadharNumber, file });
  };

  return (
    <div>
      <form
        className="w-full md:max-w-2xl bg-white  rounded-lg p-6 shadow-2xl"
        onSubmit={handleSubmit}
      >
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
                className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              className="w-64 h-64 object-cover rounded-lg "
            />
          </div>
        )}

        <OtpField
          otpSent={otpSent}
          handleSendOtp={handleSendOtp}
          handleOtpChange={handleOtpChange}
          otp={otp}
          mobileNumber={mobileNumber}
        />
      </form>
    </div>
  );
}

export default AadharOtp;
