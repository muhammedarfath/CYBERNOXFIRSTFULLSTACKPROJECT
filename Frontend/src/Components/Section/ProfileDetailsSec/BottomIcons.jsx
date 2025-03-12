import React, { useEffect, useState } from "react";
import { FaStar, FaTimes, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

function BottomIcons({ slide }) {
  const accessToken = useSelector((state) => state.auth.token);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const socketUrl = `${socketBaseUrl}?token=${accessToken}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      console.log("WebSocket Connected");
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket Closed:", event.code, event.reason);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handleHeartClick = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    socket.send(
      JSON.stringify({
        option: "interest_sent",
        userId: slide.user_profile.user.id,
      })
    );

    // Show success message
    Swal.fire({
      icon: "success",
      title: "Interest Sent!",
      text: "Your interest has been sent successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSaveClick = async () => {
    const response = await axiosInstance.post(`${requests.savePost}`, {
      saved_user_id: slide.user_profile.user.id,
    });
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Profile Saved",
        text: "This Profile Saved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[300px] h-[150px] mt-5">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500 transition-colors">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500"
            onClick={handleSaveClick}
          >
            <FaStar className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500"
            onClick={handleBackClick}
          >
            <FaTimes className="h-8 w-8 text-white" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="h-16 w-16 rounded-full bg-button flex items-center justify-center cursor-pointer hover:bg-amber-500"
            onClick={handleHeartClick}
          >
            <FaCheck className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BottomIcons;
