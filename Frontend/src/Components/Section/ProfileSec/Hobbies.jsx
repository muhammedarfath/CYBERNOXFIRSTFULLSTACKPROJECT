import { useDisclosure } from "@nextui-org/react";
import React from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";
import { HobbiesModal } from "../../Modal/HobbiesModal";

function Hobbies({ profileDetails,fetchDetails }) {

  const userHobby = profileDetails?.user_hobby || {}; 

  const hobbies = [
    { label: "Pets Details", value: userHobby.pets_details || "Add Pets Details" },
    { label: "Favourite Sports", value: userHobby.favourite_sports || "Add Favourite Sports" },
    { label: "Favourite Places", value: userHobby.favourite_places || "Add Favourite Places" },
    { label: "Your Favourite Books", value: userHobby.favourite_books || "Add Favourite Books" },
    { label: "Movies and Musics", value: userHobby.movies_and_music || "Add Movies and Musics" },
    { label: "Dress Sense", value: userHobby.dress_sense || "Add Dress Sense" },
    { label: "Body Art", value: userHobby.body_art || "Add Body Art" },
    { label: "Exercise", value: userHobby.exercise || "Add Exercise" },
    { label: "Eating Habits", value: userHobby.eating_habits || "Add Eating Habits" },
    { label: "Smoking Habits", value: userHobby.smoking_habits || "Add Smoking Habits" },
    { label: "Drinking Habits", value: userHobby.drinking_habits || "Add Drinking Habits" },
    { label: "Cooking Skill", value: userHobby.cooking_skill || "Add Cooking Skill" },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full p-3">
      <div className="flex justify-end items-center mb-3">
        <TbUserEdit
          className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400"
          onClick={onOpen}
        />
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
            </div>
          </div>
        ))}
      </div>

      <HobbiesModal isOpen={isOpen} onOpenChange={onOpenChange} userHobby={userHobby} fetchDetails={fetchDetails}/>
    </div>
  );
}

export default Hobbies;