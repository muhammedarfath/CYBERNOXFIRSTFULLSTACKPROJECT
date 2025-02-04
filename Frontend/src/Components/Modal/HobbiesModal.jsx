import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
export function HobbiesModal({ isOpen, onOpenChange, profileDetails }) {
  const [profileData, setProfileData] = useState({
    "Pets Details": "Add Pets Details",
    "Favourite Sports": "Add Favourite Sports",
    "Favourite Places": "Add Favourite Places",
    "Your Favourite Books": "Add Favourite Books",
    "Movies and Musics": "Add Movies and Musics",
    "Dress Sense": "Add Dress Sense",
    "Body Art": "Add Body Art",
    Exercise: "Add Exercise",
    "Eating Habits": "Add Eating Habits",
    "Smoking Habits": "Add Smoking Habits",
    "Drinking Habits": "Add Drinking Habits",
    "Cooking Skill": "Add Cooking Skill",
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          key="editmodal"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-primary ">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <TbUserEdit className="mr-2" /> Edit Hobbies, Likes & Favorites
            </h2>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <CgClose size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="pets-details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pets Details
                </label>
                <input
                  type="text"
                  id="pets-details"
                  name="Pets Details"
                  value={profileData["Pets Details"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="favourite-sports"
                  className="block text-sm font-medium text-gray-700"
                >
                  Favourite Sports
                </label>
                <input
                  type="text"
                  id="favourite-sports"
                  name="Favourite Sports"
                  value={profileData["Favourite Sports"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="favourite-places"
                  className="block text-sm font-medium text-gray-700"
                >
                  Favourite Places
                </label>
                <input
                  type="text"
                  id="favourite-places"
                  name="Favourite Places"
                  value={profileData["Favourite Places"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="your-favourite-books"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Favourite Books
                </label>
                <input
                  type="text"
                  id="your-favourite-books"
                  name="Your Favourite Books"
                  value={profileData["Your Favourite Books"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="movies-and-musics"
                  className="block text-sm font-medium text-gray-700"
                >
                  Movies and Musics
                </label>
                <input
                  type="text"
                  id="movies-and-musics"
                  name="Movies and Musics"
                  value={profileData["Movies and Musics"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="dress-sense"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dress Sense
                </label>
                <input
                  type="text"
                  id="dress-sense"
                  name="Dress Sense"
                  value={profileData["Dress Sense"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="body-art"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body Art
                </label>
                <input
                  type="text"
                  id="body-art"
                  name="Body Art"
                  value={profileData["Body Art"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="exercise"
                  className="block text-sm font-medium text-gray-700"
                >
                  Exercise
                </label>
                <input
                  type="text"
                  id="exercise"
                  name="Exercise"
                  value={profileData["Exercise"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="eating-habits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Eating Habits
                </label>
                <input
                  type="text"
                  id="eating-habits"
                  name="Eating Habits"
                  value={profileData["Eating Habits"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="smoking-habits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Smoking Habits
                </label>
                <input
                  type="text"
                  id="smoking-habits"
                  name="Smoking Habits"
                  value={profileData["Smoking Habits"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="drinking-habits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Drinking Habits
                </label>
                <input
                  type="text"
                  id="drinking-habits"
                  name="Drinking Habits"
                  value={profileData["Drinking Habits"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="cooking-skill"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cooking Skill
                </label>
                <input
                  type="text"
                  id="cooking-skill"
                  name="Cooking Skill"
                  value={profileData["Cooking Skill"]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClose}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <FiX size={20} />
                  <span className="ml-2">Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FiSave size={20} />
                  <span className="ml-2">Save</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
