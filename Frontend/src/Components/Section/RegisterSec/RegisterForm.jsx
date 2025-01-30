import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import requests from "../../../lib/urls";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Redux/slices/authSlice";
import { toast } from "react-hot-toast";
function RegisterForm() {
  const [profileForOptions, setProfileForOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    createfor: "",
    gender: "",
    password: "",
    termsandcondition: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [profileForResponse, genderResponse] = await Promise.all([
          axios.get(`${requests.getProfileFor}`),
          axios.get(`${requests.getGender}`),
        ]);
        setProfileForOptions(profileForResponse.data);
        setGenderOptions(genderResponse.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [id]: "" });
  };

  const handleProfileForChange = (event) => {
    setFormData({ ...formData, createfor: event.target.value }); 
    setErrors({ ...errors, createfor: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!formData.createfor || formData.createfor === "Choose One")
      newErrors.createfor = "Please select who this profile is for.";
    if (formData.createfor && !formData.gender)
      newErrors.gender = "Please select gender.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.termsandcondition)
      newErrors.termsandcondition = "You must accept the Terms & Conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { mobile, ...rest } = formData;
        const dataToSend = { ...rest, mobileno: mobile };

        const response = await axios.post(
          `${requests.registeruser}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        dispatch(
          loginSuccess({
            email: response.data.user.email,
            token: response.data.access,
            refresh: response.data.refresh,
            userId: response.data.user.id,
          })
        );

        toast.success("Registration successful!");

        navigate("/basic-details");
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <form
      className="w-full flex flex-col max-w-lg bg-white border border-white rounded-lg p-6 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-xl">Register Now!</h1>
        <hr className="mb-3 border-gray" />
      </div>
      {/* Email Field */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email <span className="text-red">*</span>
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gary200 border ${
              errors.email ? "border-red" : "border-gray"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="email"
            type="email"
            placeholder="sample@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red text-xs italic">{errors.email}</p>
          )}
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
            className={`appearance-none block w-full bg-gray-200 text-gary200 border ${
              errors.mobile ? "border-red" : "border-gray"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="mobile"
            type="text"
            placeholder="+91 1234567890"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          {errors.mobile && (
            <p className="text-red text-xs italic">{errors.mobile}</p>
          )}
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
            className={`appearance-none block w-full bg-gray-200 text-gary200 border ${
              errors.createfor ? "border-red" : "border-gray"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="profile-for"
            value={formData.createfor}
            onChange={handleProfileForChange}
          >
            <option>Choose One</option>
            {profileForOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {errors.createfor && (
            <p className="text-red text-xs italic">{errors.createfor}</p>
          )}
        </div>
      </div>

      {/* Gender Field */}
      {formData.createfor !== "Choose One" && formData.createfor && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
              htmlFor="gender"
            >
              Gender <span className="text-red">*</span>
            </label>
            <select
              className={`appearance-none block w-full bg-gray-200 text-gary200 border ${
                errors.gender ? "border-red" : "border-gray"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option>Choose One</option>
              {genderOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red text-xs italic">{errors.gender}</p>
            )}
          </div>
        </div>
      )}

      {/* Password Field */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gary200 text-xs font-bold mb-2"
            htmlFor="password"
          >
            Password <span className="text-red">*</span>
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gary200 border ${
              errors.password ? "border-red" : "border-gray"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="password"
            type="password"
            placeholder="**********"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red text-xs italic">{errors.password}</p>
          )}
        </div>
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="flex items-start mb-6">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          id="termsandcondition"
          checked={formData.termsandcondition}
          onChange={handleInputChange}
        />
        <label htmlFor="termsandcondition" className="text-sm text-gray-700">
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
      {errors.termsandcondition && (
        <p className="text-red text-xs italic">{errors.termsandcondition}</p>
      )}

      <div>
        <button
          className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          REGISTER FREE
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
