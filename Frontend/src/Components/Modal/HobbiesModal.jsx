import { useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import requests from "../../lib/urls";
import axiosInstance from "../../axios";

export function HobbiesModal({ isOpen, onOpenChange, userHobby,fetchDetails }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pets_details: userHobby.pets_details || "",
    favourite_sports: userHobby.favourite_sports || "",
    favourite_places: userHobby.favourite_places || "",
    favourite_books: userHobby.favourite_books || "",
    movies_and_music: userHobby.movies_and_music || "",
    dress_sense: userHobby.dress_sense || "",
    body_art: userHobby.body_art || "",
    exercise: userHobby.exercise || "",
    eating_habits: userHobby.eating_habits || "",
    smoking_habits: userHobby.smoking_habits || "",
    drinking_habits: userHobby.drinking_habits || "",
    cooking_skill: userHobby.cooking_skill || "",
  });

  const [options, setOptions] = useState({
    BodyArt: [],
    Exercise: [],
    EatingHabits: [],
    DrinkingHabits: [],
    SmokingPreference: [],
    CookingSkill: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          BodyArtRes,
          ExerciseRes,
          EatingHabitsRes,
          DrinkingHabitsRes,
          SmokingPreferenceRes,
          CookingSkillRes,
          
        ] = await Promise.all([
          axiosInstance.get(requests.fetchBodyArt),
          axiosInstance.get(requests.fetchExercise),
          axiosInstance.get(requests.fetchEatingHabits),
          axiosInstance.get(requests.fetchDrinkingStatus),
          axiosInstance.get(requests.fetchSmokingStatus),
          axiosInstance.get(requests.fetchCookingSkill),
        ]);

        console.log("Fetched Data:", {
          BodyArt: BodyArtRes.data,
          Exercise: ExerciseRes.data,
          EatingHabits: EatingHabitsRes.data,
          DrinkingHabits: DrinkingHabitsRes.data,
          SmokingPreference: SmokingPreferenceRes.data,
          CookingSkill: CookingSkillRes.data,
        });

        setOptions({
          BodyArt: BodyArtRes.data || [],
          Exercise: ExerciseRes.data || [],
          EatingHabits: EatingHabitsRes.data || [],
          DrinkingHabits: DrinkingHabitsRes.data || [],
          SmokingPreference: SmokingPreferenceRes.data || [],
          CookingSkill: CookingSkillRes.data || [],
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData,"this is formdata");

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key]) updatedFields[key] = formData[key];
    });

    try {
      const response = await axiosInstance.patch(
        requests.UpdateHobbies,
        updatedFields
      );


      if (response.status === 200) {
        console.log("Hobbies updated successfully:", response.data);
        fetchDetails();
        onOpenChange(false);
      } else {
        console.error("Failed response:", response);
      }
    } catch (error) {
      console.error(
        "Error updating hobbies:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
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
                  name="pets_details"
                  value={formData.pets_details}
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
                  name="favourite_sports"
                  value={formData.favourite_sports}
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
                  name="favourite_places"
                  value={formData.favourite_places}
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
                  name="favourite_books"
                  value={formData.favourite_books}
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
                  name="movies_and_music"
                  value={formData.movies_and_music}
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
                  name="dress_sense"
                  value={formData.dress_sense}
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
                <select
                  id="body-art"
                  name="body_art"
                  value={formData.body_art}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {options.BodyArt.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="exercise"
                  className="block text-sm font-medium text-gray-700"
                >
                  Exercise
                </label>
                <select
                  id="exercise"
                  name="exercise"
                  value={formData.exercise}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {options.Exercise.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="eating-habits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Eating Habits
                </label>
                <select
                  id="eating-habits"
                  name="eating_habits"
                  value={formData.eating_habits}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {options.EatingHabits.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="smoking-habits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Smoking Habits
                </label>
                <select
                  id="smoking-habits"
                  name="smoking_habits"
                  value={formData.smoking_habits}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {options.SmokingPreference.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="drinking-habits"
                  className="block text-sm font-medium text-gray-700"
                >
                  Drinking Habits
                </label>
                <select
                  id="drinking-habits"
                  name="drinking_habits"
                  value={formData.drinking_habits}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {options.DrinkingHabits.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cooking-skill"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cooking Skill
                </label>
                <select
                  id="cooking-skill"
                  name="cooking_skill"
                  value={formData.cooking_skill}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="">Select an option</option>
                  {options.CookingSkill.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
                >
                  {loading ? "Saving..." : <><FiSave className="mr-2" /> Save</>}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
