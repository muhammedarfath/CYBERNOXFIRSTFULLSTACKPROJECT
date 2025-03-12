import React, { useContext, useEffect, useState } from "react";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import { FaHeart } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import AuthContext from "../../../context/AuthContext";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { backendUrl } from "../../../Constants/Constants";
import userphoto from "../../../assets/logo PNG M.png";
import MatchingSkeleton from "../../Loading/MatchingSkeleton";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

function BestMatchesSec() {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filter, setFilter] = useState("Partner Expectation");
  const { profileDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expectation, setExpectation] = useState([]);
  const [location, setLocation] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const accessToken = useSelector((state) => state.auth.token);

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

  const handleConnectClick = async (e, userProfile) => {
    e.stopPropagation();


    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    try {
      socket.send(
        JSON.stringify({
          option: "interest_sent",
          userId: userProfile.user.id,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Interest Sent!",
        text: "Your interest has been sent successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      handleSearch();

      console.log("Like sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending like:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filter]);

  const handleProfileClick = (slide) => {
    navigate("/profiledetails", { state: { slide } });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      let params = {};
      if (filter === "Partner Expectation") {
        params = {
          marital_status:
            profileDetails?.partner_preferences?.marital_status?.[0] ||
            undefined,
          education:
            profileDetails?.partner_preferences?.education?.[0] || undefined,
          caste: profileDetails?.user_profile?.caste || undefined,
          religion: profileDetails?.user_profile?.religion || undefined,
          physical_status:
            profileDetails?.partner_preferences?.physical_status?.[0] ||
            undefined,
          weight:
            `${profileDetails?.user_profile?.weight - 10} - ${
              profileDetails?.user_profile?.weight + 10
            }` || undefined,
          height:
            `${profileDetails?.user_profile?.height - 2} - ${
              profileDetails?.user_profile?.height + 2
            }` || undefined,
          income:
            profileDetails?.partner_preferences?.annual_income?.[0] ||
            undefined,
          age:
            `${
              calculateAge(profileDetails?.user_profile?.date_of_birth) - 5
            } - ${
              calculateAge(profileDetails?.user_profile?.date_of_birth) + 5
            }` || undefined,
        };
        const response = await axiosInstance.get(`${requests.Expectation}`, {
          params,
        });
        setExpectation(response.data);
      } else if (filter === "Location") {
        params = {
          country: profileDetails?.groom_bride_info?.country || undefined,
          state: profileDetails?.groom_bride_info?.state || undefined,
          city: profileDetails?.groom_bride_info?.city || undefined,
        };
        const response = await axiosInstance.get(`${requests.Expectation}`, {
          params,
        });
        setLocation(response.data);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("No matching results found.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
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

  const bestmatch = filter === "Partner Expectation" ? expectation : location;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="w-full h-full py-6">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-purple-800">
              {filter === "Partner Expectation"
                ? "Best Matches"
                : "Nearby Matches"}
            </h1>
            <p className="text-gray-600 text-sm">
              View and manage all your likes and interests.
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark"
            >
              <MdFilterList className="text-2xl" /> Filter
            </button>

            {showFilterOptions && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-md rounded-md p-2 z-50 animate-fade-in">
                <ul className="flex flex-col">
                  {["Partner Expectation", "Location"].map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                        filter === item ? "bg-gray-200 font-bold" : ""
                      }`}
                      onClick={() => {
                        setFilter(item);
                        setShowFilterOptions(false);
                      }}
                    >
                      <IoIosCheckmarkCircleOutline
                        className={`text-xl ${
                          filter === item ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {loading && <MatchingSkeleton />}

        {error && <div className="text-center text-red-500 mt-8">{error}</div>}

        {!loading && !error && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {bestmatch.slice(0, visibleCount).map((user, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-b from-primary rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-all cursor-pointer"
                  onClick={() => handleProfileClick(user)}
                >
                  <img
                    src={
                      user.user_profile?.user.profile_picture
                        ? `${backendUrl}${user.user_profile?.user.profile_picture}`
                        : userphoto
                    }
                    alt={user.user_profile?.name || "User"}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    {user.user_profile?.name || "Unknown User"}
                    <IoIosCheckmarkCircleOutline className="ml-2 text-green-500 text-xl" />
                  </h3>
                  <button
                    className="text-white p-3 rounded-md bg-button mb-4"
                    onClick={(e) => handleConnectClick(e, user.user_profile)}
                  >
                    Click to connect
                  </button>
                </div>
              ))}
            </div>

            {visibleCount < bestmatch.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <FloatingDockDemo />
    </div>
  );
}

export default BestMatchesSec;
