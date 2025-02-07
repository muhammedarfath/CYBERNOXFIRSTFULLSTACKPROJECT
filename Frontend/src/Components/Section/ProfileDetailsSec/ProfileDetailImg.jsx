import React from "react";
import BottomIcons from "./BottomIcons";
import { backendUrl } from "../../../Constants/Constants";

function ProfileDetailImg({ slide }) {

  return (
    <div className="">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={`${backendUrl}${slide.user_profile.user.profile_picture}`}
            className="w-full h-full bg-gray mb-4"
            alt="Profile"
          />
          <h1 className="text-xl font-bold">John Doe</h1>
          <p className="text-gray-700">Software Developer</p>
        </div>
        <hr className="my-6 border-t border-gray-300" />

        <div className="flex flex-col">
          <span className="text-gray-700 uppercase font-bold tracking-wider mb-4">
            Posts
          </span>
          {slide.posts && slide.posts.length > 0 ? (
            slide.posts.map((post, index) => (
              <div
                key={post.id}
                className="bg-gray-100 p-4 rounded-lg mb-4 shadow"
              >
                <p className="text-gray-800 mb-2">{post.content}</p>
                {post.image && (
                  <img
                    src={`${backendUrl}${post.image}`}
                    className="w-full h-full object-cover rounded-md"
                    alt={`Post ${index + 1}`}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts available</p>
          )}
        </div>
      </div>
      <BottomIcons />
    </div>
  );
}

export default ProfileDetailImg;
