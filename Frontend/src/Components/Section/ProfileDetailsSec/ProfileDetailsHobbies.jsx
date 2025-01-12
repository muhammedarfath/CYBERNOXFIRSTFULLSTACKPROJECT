import React from "react";
import {
  FaHeart,
  FaSmokingBan,
  FaGlassWhiskey,
  FaHandHoldingHeart,
  FaKaaba,
  FaUsers,
  FaUserFriends,
  FaHandsHelping,
  FaPlane,
  FaShoppingBag,
  FaMicrophone,
  FaWhatsapp,
  FaInstagram,
  FaSmile,
  FaHandshake,
} from "react-icons/fa";

function ProfileDetailsHobbies() {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaHeart className="text-rose-500" />
        Hobbies and Interest
      </h2>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <div className="flex  items-center gap-2">
            <FaSmokingBan className="text-gray-600" />
            <span>Smoking Habits</span>
          </div>
          <span className="text-gray-600">Never Smokes</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <div className="flex items-center gap-2">
            <FaGlassWhiskey className="text-gray-600" />
            <span>Drinking Habits</span>
          </div>
          <span className="text-gray-600">Never Drinks</span>
        </div>
      </div>
      <h3 className="font-semibold mb-3">Hobbies, Likes & Favorites</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { icon: <FaHandHoldingHeart />, text: "Charity" },
          { icon: <FaKaaba />, text: "Completed Umrah" },
          { icon: <FaUsers />, text: "Family time" },
          {
            icon: <FaUserFriends />,
            text: "Spending time with Friends",
          },
          { icon: <FaHandsHelping />, text: "Volunteering" },
          { icon: <FaPlane />, text: "Travel" },
          { icon: <FaShoppingBag />, text: "Shopping" },
          { icon: <FaMicrophone />, text: "Singing" },
          { icon: <FaWhatsapp />, text: "Whatsapp" },
          { icon: <FaInstagram />, text: "Instagram" },
        ].map((hobby, index) => (
          <span
            key={index}
            className="flex items-center gap-2 px-4 py-2 bg-gray50 shadow-md rounded-full text-sm"
          >
            {hobby.icon}
            {hobby.text}
          </span>
        ))}
      </div>
      <h3 className="font-semibold mb-3">Personality</h3>
      <div className="flex flex-wrap gap-3">
        {[
          { icon: <FaHeart />, text: "Affectionate" },
          { icon: <FaUsers />, text: "Extroverted" },
          { icon: <FaHandshake />, text: "Open-minded" },
          { icon: <FaSmile />, text: "Positive" },
          { icon: <FaHandshake />, text: "Respectful" },
        ].map((trait, index) => (
          <span
            key={index}
            className="flex items-center gap-2 px-4 py-2 bg-gray50 shadow-md rounded-full text-sm"
          >
            {trait.icon}
            {trait.text}
          </span>
        ))}
      </div>
    </>
  );
}

export default ProfileDetailsHobbies;
