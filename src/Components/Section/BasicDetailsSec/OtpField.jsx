import React from "react";
import { Link } from "react-router-dom";

function OtpField({otpSent,handleSendOtp,handleOtpChange,otp,mobileNumber}) {
  return (
    <>
      {otpSent && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="otp"
            >
              Enter OTP sent to your linked mobile number: {mobileNumber}
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
      )}

      <div className="flex justify-center flex-col">
        {!otpSent ? (
          <button
            type="button"
            className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        ) : (
          <Link to="/priceing">
            <button
              type="submit"
              className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default OtpField;
