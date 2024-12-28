import React from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";

function Hobbies() {
  const hobbies = [
    { label: "Pets Details", value: "Add Pets Details" },
    { label: "Favourite Sports", value: "Add Favourite Sports" },
    { label: "Favourite Places", value: "Add Favourite Places" },
    { label: "Places you Visited", value: "Add Places you Visited" },
    { label: "Your Favourite Books", value: "Add Favourite Books" },
    { label: "Movies and Musics", value: "Add Movies and Musics" },
    { label: "Sense of Humour", value: "Add Sense of Humour" },
    { label: "Dress Sense", value: "Add Dress Sense" },
    { label: "Body Art", value: "Add Body Art" },
    { label: "Exercise", value: "Add Exercise" },
    { label: "Eating Habits", value: "Add Eating Habits" },
    { label: "Smoking Habits", value: "Add Smoking Habits" },
    { label: "Drinking Habits", value: "Add Drinking Habits" },
    { label: "Cooking Skil", value: "Add Cooking Skil" },
  ];

  return (
    <div className="w-full p-3">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">Hobbies, Likes & Favorites</h1>
        <TbUserEdit className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400" />
      </div>

      <div className="space-y-1">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <span className="text-gray-700 text-lg">{hobby.label}</span>
            <div className="flex items-center">
              <span className="text-primary2">{hobby.value}</span>
              <TbChevronRight className="ml-2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hobbies;
