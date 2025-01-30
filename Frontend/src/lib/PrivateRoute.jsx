import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import requests from "./urls";
import Swal from "sweetalert2";
const PrivateRoute = ({ children }) => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    if (isLoggedIn && token && !profileChecked) {
      const checkBasicDetails = async () => {
        try {
          const response = await axiosInstance.get(`${requests.checkProfile}`);
          if (response.data.profile_complete === false) {
            Swal.fire({
              title: "Incomplete Profile",
              text: "Please fill in the basic details to proceed.",
              icon: "warning",
              confirmButtonText: "Go to Details",
              confirmButtonColor: "#CC2B52", 
              customClass: {
                confirmButton: "custom-confirm-button", 
              },
            }).then(() => {
              navigate("/basic-details");
            });
          }
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking profile details:", error);
        }
      };
      checkBasicDetails();
    }
  }, [isLoggedIn, token, profileChecked, navigate]);

  if (!isLoggedIn && !token) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default PrivateRoute;
