import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  // State to manage the selected option
  const [profileFor, setProfileFor] = useState("");

  // Handle dropdown change
  const handleProfileForChange = (event) => {
    setProfileFor(event.target.value);
  };

  return (
    <form className="w-full flex flex-col max-w-lg bg-white border border-white rounded-lg p-6 shadow-md">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl">Register Now!</h1>
        <hr className="mb-3 border-gray" />
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email <span className="text-red">*</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="sample@gmail.com"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
            htmlFor="mobile"
          >
            Mobile No <span className="text-red">*</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="mobile"
            type="text"
            placeholder="+91 1234567890"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
            htmlFor="profile-for"
          >
            Profile Create For <span className="text-red">*</span>
          </label>
          <select
            className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="profile-for"
            value={profileFor}
            onChange={handleProfileForChange} // Add event handler
          >
            <option>Choose One</option>
            <option value="Self">Self</option>
            <option value="Family Member">Family Member</option>
            <option value="Friend">Friend</option>
          </select>
        </div>
      </div>

      {/* Conditionally render the Gender field */}
      {profileFor !== "Choose One" && profileFor && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
              htmlFor="gender"
            >
              Gender <span className="text-red">*</span>
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="gender"
            >
              <option>Choose One</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
            htmlFor="password"
          >
            Password <span className="text-red">*</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gary200 border border-gray rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="password"
            type="password"
            placeholder="**********"
          />
        </div>
      </div>
      <div className="flex items-start mb-6">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          id="terms"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the{" "}
          <a href="#" className="text-blue-600 underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>
        </label>
      </div>
      <div>
        <Link to="/basic-details" className="flex justify-center flex-col">
          <button
            className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            REGISTER FREE
          </button>
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
