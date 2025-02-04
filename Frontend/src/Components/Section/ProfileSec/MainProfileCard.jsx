import React, { useContext, useEffect, useState } from "react";
import { TbEdit, TbCamera } from "react-icons/tb";
import userphoto from "../../../assets/User Male Profile.svg";
import indian from "../../../assets/Indian Flag Icon.png";
import axios from "axios";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { backendUrl } from "../../../Constants/Constants";
import Swal from "sweetalert2";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/slices/authSlice";
import { useDispatch } from "react-redux";

function MainProfileCard({ profileDetails,logoutUser }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    logoutUser() 
    navigate("/register"); 
  };

  useEffect(() => {
    if (profileDetails?.user_profile?.user.profile_picture) {
      setPreview(
        `${backendUrl}${profileDetails.user_profile.user.profile_picture}`
      );
    } else {
      setPreview(userphoto);
    }
  }, [profileDetails]);

  const handleFileUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const response = await axiosInstance.patch(
        `${requests.UpdateProfile}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile picture updated successfully:", response.data);
      setFile("");
      Swal.fire({
        title: "Success!",
        text: "Your profile picture has been updated.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCameraClick = () => {
    document.getElementById("file-input").click();
  };

  // Fallbacks for undefined values
  const name = profileDetails?.user_profile?.name || "N/A";
  const uniqueId = profileDetails?.user_profile?.user?.unique_id || "N/A";
  const dateOfBirth = profileDetails?.user_profile?.date_of_birth;
  const religion = profileDetails?.user_profile?.religion || "N/A";
  const occupation = profileDetails?.groom_bride_info?.occupation || "N/A";
  const city = profileDetails?.groom_bride_info?.city || "N/A";
  const state = profileDetails?.groom_bride_info?.state || "N/A";
  const country = profileDetails?.groom_bride_info?.country || "N/A";

  const age = calculateAge(dateOfBirth);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-between p-6 bg-gray-50 rounded-lg gap-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-auto">
        <div className="relative flex-1 h-full">
          <button
            onClick={handleCameraClick}
            className="absolute top-2 right-2 bg-gray text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-700 transition-colors text-sm z-10"
          >
            <TbCamera className="w-5 h-5" />
            Take Photo
          </button>
          <div className="h-full w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-200">
            <img
              src={preview}
              alt="Profile placeholder"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <button
              onClick={handleFileUpload}
              className="absolute bottom-4 left-4 bg-button text-white px-4 py-2 rounded-full"
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 text-center lg:text-left">
            {name}
          </h1>
          <p className="text-primary2 text-center lg:text-left">{uniqueId}</p>
          <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left">
            {age} yrs, {religion}
          </p>
          <p className="text-gray-700 text-sm sm:text-base text-center lg:text-left">
            {occupation}
          </p>
          <div className="flex items-center gap-2 mt-2 bg-gray px-4 py-2 rounded-full w-fit mx-auto lg:mx-0">
            <img src={indian} alt="Indian flag" className="w-5 h-5" />
            <span className="text-gray-700 text-sm">
              {city}, {state}, {country}
            </span>
          </div>
          <button
            onClick={handleLogout} 
            className="bg-button flex items-center gap-3 p-2 text-white rounded-lg"
          >
            <AiOutlineLogout />
            Logout
          </button>
        </div>
      </div>

      <button className="bg-button p-2 rounded-lg transition-colors self-center lg:self-start">
        <TbEdit className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

export default MainProfileCard;
