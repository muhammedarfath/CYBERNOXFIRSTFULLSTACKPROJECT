import { useDisclosure } from "@nextui-org/react";
import React from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";
import { HobbiesModal } from "../../Modal/HobbiesModal";

function Hobbies({profileDetails}) {
  const hobbies = [
    { label: "Pets Details", value: "Add Pets Details" },
    { label: "Favourite Sports", value: "Add Favourite Sports" },
    { label: "Favourite Places", value: "Add Favourite Places" },
    { label: "Your Favourite Books", value: "Add Favourite Books" },
    { label: "Movies and Musics", value: "Add Movies and Musics" },
    { label: "Dress Sense", value: "Add Dress Sense" },
    { label: "Body Art", value: "Add Body Art" },
    { label: "Exercise", value: "Add Exercise" },
    { label: "Eating Habits", value: "Add Eating Habits" },
    { label: "Smoking Habits", value: "Add Smoking Habits" },
    { label: "Drinking Habits", value: "Add Drinking Habits" },
    { label: "Cooking Skil", value: "Add Cooking Skil" },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full p-3">
      <div className="flex justify-end items-center mb-3">
        <TbUserEdit
          className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400"
          onClick={onOpen}
        />{" "}
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



      <HobbiesModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          profileDetails={profileDetails}
        />
    </div>
  );
}

export default Hobbies;
