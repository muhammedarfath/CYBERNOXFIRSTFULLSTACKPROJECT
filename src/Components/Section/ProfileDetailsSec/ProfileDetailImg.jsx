import React from "react";

function ProfileDetailImg({slide_img_5}) {
  return (
    <div className="col-span-4 sm:col-span-3">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={slide_img_5}
            className="w-full h-full bg-gray mb-4"
            alt="Profile"
          />
          <h1 className="text-xl font-bold">John Doe</h1>
          <p className="text-gray-700">Software Developer</p>
        </div>
        <hr className="my-6 border-t border-gray-300" />
        <div className="flex flex-col">
          <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
            Gallery
          </span>
          <img
            src={slide_img_5}
            className="w-full h-full bg-gray-300 mb-4"
            alt="Gallery"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailImg;
