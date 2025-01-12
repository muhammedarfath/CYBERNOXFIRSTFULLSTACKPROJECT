import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startLoading,
  loginSuccess,
  loginFailure,
} from "../../../Redux/slices/authSlice";
import { motion } from "framer-motion";

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
    e.preventDefault(); 

    dispatch(startLoading());

    try {
      const response = await fakeVerifyOtpApi({ otp, mobileNumber }); 
      if (response.success) {
        dispatch(loginSuccess({ username: response.username })); 
        navigate("/pricing"); 
      } else {
        dispatch(loginFailure());
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      dispatch(loginFailure());
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Define animation variants for entry and exit
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {otpSent && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex flex-wrap -mx-3 mb-6"
        >
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
        </motion.div>
      )}

      <div className="flex justify-center flex-col">
        {!otpSent ? (
          <motion.button
            type="button"
            className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSendOtp}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            Send OTP
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            Submit
          </motion.button>
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
