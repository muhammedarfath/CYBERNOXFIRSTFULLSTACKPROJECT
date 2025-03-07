import React from "react";
import {
  FaHeart,
  FaSmokingBan,
  FaGlassWhiskey,
  FaPaw,
  FaBook,
  FaUtensils,
  FaDumbbell,
  FaTshirt,
  FaPalette,
  FaMapMarkerAlt,
  FaFilm,
  FaHandsHelping,
} from "react-icons/fa";

function ProfileDetailsHobbies({ hobbies = {} }) {
  // Ensure hobbies object is always defined
  const {
    smoking_habits,
    drinking_habits,
    pets_details,
    favourite_sports,
    favourite_places,
    favourite_books,
    movies_and_music,
    dress_sense,
    body_art,
    exercise,
    eating_habits,
    cooking_skill,
  } = hobbies || {};

  const hobbyItems = [
    { icon: <FaPaw />, label: "Pets", value: pets_details },
    { icon: <FaBook />, label: "Favorite Books", value: favourite_books },
    { icon: <FaUtensils />, label: "Eating Habits", value: eating_habits },
    { icon: <FaDumbbell />, label: "Exercise", value: exercise },
    { icon: <FaTshirt />, label: "Dress Sense", value: dress_sense },
    { icon: <FaPalette />, label: "Body Art", value: body_art },
    { icon: <FaMapMarkerAlt />, label: "Favorite Places", value: favourite_places },
    { icon: <FaFilm />, label: "Movies & Music", value: movies_and_music },
    { icon: <FaHandsHelping />, label: "Cooking Skills", value: cooking_skill },
    { icon: <FaDumbbell />, label: "Favorite Sports", value: favourite_sports },
  ].filter((item) => item.value); // Only show items with values

  return (
    <>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaHeart className="text-rose-500" />
        Hobbies and Interests
      </h2>

      <div className="space-y-4 mb-6">
        {/* Smoking Habit */}
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <div className="flex items-center gap-2">
            <FaSmokingBan className="text-gray-600" />
            <span>Smoking Habits</span>
          </div>
          <span className="text-gray-600">{smoking_habits || "Not specified"}</span>
        </div>

        {/* Drinking Habit */}
        <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
          <div className="flex items-center gap-2">
            <FaGlassWhiskey className="text-gray-600" />
            <span>Drinking Habits</span>
          </div>
          <span className="text-gray-600">{drinking_habits || "Not specified"}</span>
        </div>
      </div>

      <h3 className="font-semibold mb-3">Hobbies, Likes & Favorites</h3>
      {hobbyItems.length > 0 ? (
        <div className="flex flex-wrap gap-3 mb-6">
          {hobbyItems.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray50 shadow-md rounded-full text-sm"
            >
              {item.icon}
              {item.value}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No hobbies or favorites specified.</p>
      )}
    </>
  );
}

export default ProfileDetailsHobbies;
