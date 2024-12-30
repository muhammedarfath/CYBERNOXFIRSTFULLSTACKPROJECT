import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startLoading,
  loginSuccess,
  loginFailure,
} from "../../../Redux/slices/authSlice";

function OtpField({
  otpSent,
  handleSendOtp,
  handleOtpChange,
  otp,
  mobileNumber,
}) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    dispatch(startLoading());

    try {
      const response = await fakeVerifyOtpApi({ otp, mobileNumber }); 
      if (response.success) {
        dispatch(loginSuccess({ username: response.username })); 
        navigate("/pricing"); 
      } else {
        // Dispatch login failure
        dispatch(loginFailure());
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      // Handle any errors during API call
      dispatch(loginFailure());
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again later.");
    }
  };

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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          <button
            type="submit"
            className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}

export default OtpField;

const fakeVerifyOtpApi = async ({ otp, mobileNumber }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve({ success: true, username: "testuser" });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};
