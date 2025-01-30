import React, { useContext } from "react";
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
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { TiDeleteOutline } from "react-icons/ti";
import AuthContext from "../../../context/AuthContext";
import Loader from "../../Loading/Loader";

function ProfileSec() {
  const { profileDetails, posts, setPosts, loading,logoutUser } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader/>
      </div>
    );
  }
  
  const handleDelete = async (postId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this post?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (result.isConfirmed) {
        await axiosInstance.delete(`${requests.Posts}${postId}/`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
    }
  };
  
  return (
    <div className="w-full overflow-scroll h-full">
      <div className="flex md:flex-row w-full p-4">
        <div className="flex flex-col md:w-1/2 w-full flex-wrap gap-4 md:p-4">
          <div className="w-full flex items-center justify-between bg-white rounded-lg shadow-md p-5">
            <MainProfileCard profileDetails={profileDetails} logoutUser={logoutUser} />
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <BasicDetails />
          </div>

          <div className="w-full bg-white p-2 rounded-lg shadow-md ">
            <ContactDetails />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <EducationProfile />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <ReligiousDetails />
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <PhysicalDetails />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <FamilyDetails />
          </div>
          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <Hobbies />
          </div>

          <div className="w-full bg-white md:p-6 rounded-lg shadow-md ">
            <PartnerExpectation />
          </div>
        </div>
        <div className="hidden md:flex flex-col md:w-1/2">
          <AddProfileImages />
          <div className="columns-2 xl:columns-3 p-4 gap-4 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="relative">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={`${backendUrl}/${post.image}`}
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
        </div>
      </div>
      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}

export default ProfileSec;
