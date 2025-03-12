import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import ContactDetails from "./ContactDetails";
import BasicDetails from "./BasicDetails";
import EducationProfile from "./EducationProfile";
import ReligiousDetails from "./ReligiousDetails";
import AddProfileImages from "./AddProfileImages";
import PartnerExpectation from "./PartnerExpectation";
import FamilyDetails from "./FamilyDetails";
import PhysicalDetails from "./PhysicalDetails";
import Hobbies from "./Hobbies";
import MainProfileCard from "./MainProfileCard";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { backendUrl } from "../../../Constants/Constants";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiDeleteOutline,
} from "react-icons/ti";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext";
import Loader from "../../Loading/Loader";
import { useNavigate } from "react-router-dom";
import userphoto from "../../../assets/default.jpg"

function ProfileSec() {
  const navigate = useNavigate();
  const { profileDetails, posts, setPosts, loading, logoutUser, fetchDetails } =
    useContext(AuthContext);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const handleDelete = async (postId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`${requests.Posts}${postId}/`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const handleSavedDelete = async (postId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this user from the saved list?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`${requests.savePost}`, {
          data: { saved_user_id: postId }, // Corrected here
        });
        fetchDetails();
        Swal.fire("Deleted!", "The saved user has been removed.", "success");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const handleCardClick = (slide) => {
    console.log(slide, "ther is a slide");
    navigate("/profiledetails", { state: { slide } });
  };

  return (
    <div className="w-full overflow-scroll h-full mb-9">
      <div className="flex md:flex-row flex-col w-full p-4">

        <div className="flex flex-col md:w-1/2 w-full flex-wrap gap-4 md:p-4 mb-28">
          <div className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-5">
            <MainProfileCard
              profileDetails={profileDetails}
              logoutUser={logoutUser}
            />
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md">
            <BasicDetails
              profileDetails={profileDetails}
              fetchDetails={fetchDetails}
            />
          </div>

          <div className="w-full bg-white p-2 rounded-lg shadow-md">
            <ContactDetails
              profileDetails={profileDetails}
              fetchDetails={fetchDetails}
            />
          </div>

          {[
            {
              title: "Education & Professional Details",
              key: "EducationProfile",
              component: <EducationProfile profileDetails={profileDetails} />,
            },
            {
              title: "Socio - Religious Details",
              key: "ReligiousDetails",
              component: <ReligiousDetails profileDetails={profileDetails} />,
            },
            {
              title: "Physical Details",
              key: "PhysicalDetails",
              component: <PhysicalDetails profileDetails={profileDetails} />,
            },
            {
              title: "Family Details",
              key: "FamilyDetails",
              component: <FamilyDetails profileDetails={profileDetails} />,
            },
            {
              title: "Hobbies",
              key: "Hobbies",
              component: (
                <Hobbies
                  profileDetails={profileDetails}
                  fetchDetails={fetchDetails}
                />
              ),
            },
            {
              title: "Partner Expectation",
              key: "PartnerExpectation",
              component: <PartnerExpectation preferences={profileDetails} />,
            },
          ].map(({ title, key, component }) => (
            <div
              key={key}
              className="w-full bg-white md:p-6 rounded-lg p-4 shadow-md cursor-pointer"
            >
              <div
                className="flex items-center justify-between"
                onClick={() => toggleSection(key)}
              >
                <h2 className="text-lg font-semibold">{title}</h2>
                {openSection === key ? (
                  <TiArrowSortedUp className="text-xl" />
                ) : (
                  <TiArrowSortedDown className="text-xl" />
                )}
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  openSection === key
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {openSection === key && component}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:w-1/2">
          <AddProfileImages />
          <div className="columns-2 xl:columns-3 p-4 gap-4 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={`${backendUrl}${post.image}`}
                  alt={post.content}
                />
                <button
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                >
                  <TiDeleteOutline className="text-3xl text-red bg-white rounded-md p-1" />
                </button>
              </div>
            ))}
          </div>

          <div className="columns-1 xl:columns-1 p-4 gap-4 space-y-4 w-full mb-40">
            <div className="w-full md:p-4 md:mt-4">
              <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="font-extrabold md:text-4xl text-xl text-gray-800">
                  Saved Profiles
                </h1>
              </div>

              <div className="columns-2 xl:columns-3 p-4 gap-4 space-y-4">
                {profileDetails?.saved_profiles?.length > 0 ? (
                  profileDetails.saved_profiles.map((savedProfile) => {
                    const savedUser = savedProfile;
                    return (
                      <div
                        key={savedUser?.id}
                        className="relative"
                        onClick={() => handleCardClick(savedUser)}
                      >
                        {savedUser?.user_profile?.user?.profile_picture ? (<img
                          className="h-auto max-w-full rounded-lg"
                          src={`${backendUrl}${savedUser?.user_profile?.user?.profile_picture}`}
                          alt={savedUser?.user_profile?.name || "Profile"}
                        />) : (
                          <img
                          className="h-auto max-w-full rounded-lg"
                          src={userphoto}
                          alt="Profile"
                        />
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleSavedDelete(savedUser?.user_profile?.user?.id);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                        >
                          <TiDeleteOutline className="text-3xl text-red bg-white rounded-md p-1" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p>No saved profiles available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

export default ProfileSec;
