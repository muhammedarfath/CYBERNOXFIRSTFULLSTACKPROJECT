import React, { useState } from "react";
import {
  FiUser,
  FiHash,
  FiCalendar,
  FiUsers,
  FiHeart,
  FiUserPlus,
  FiMapPin,
  FiClock,
  FiActivity,
  FiGlobe,
  FiMessageSquare,
  FiSave,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function EditProfile({ isOpen, onOpenChange }) {
  const [profileDetails, setProfileDetails] = useState({
    name: "Muhammed Arfath",
    profileId: "WT3677639",
    age: "21",
    gender: "Male",
    maritalStatus: "Never Married",
    profileFor: "My Self",
    willingToRelocate: "",
    marriagePlan: "",
    healthIssues: "No",
    ethnicGroup: "",
    motherTongue: "",
    languagesSpoken: "",
  });

  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileDetails);
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
              <FiUser className="mr-2" /> Edit Profile
            </h2>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiUser className="mr-2" /> Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileDetails.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="profileId"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiHash className="mr-2" /> Profile ID
                  </label>
                  <input
                    type="text"
                    id="profileId"
                    name="profileId"
                    value={profileDetails.profileId}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiCalendar className="mr-2" /> Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={profileDetails.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiUsers className="mr-2" /> Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={profileDetails.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="maritalStatus"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiHeart className="mr-2" /> Marital Status
                  </label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={profileDetails.maritalStatus}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="profileFor"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiUserPlus className="mr-2" /> Creating Profile for
                  </label>
                  <select
                    id="profileFor"
                    name="profileFor"
                    value={profileDetails.profileFor}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  >
                    <option value="My Self">My Self</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="willingToRelocate"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiMapPin className="mr-2" /> Willing to Relocate
                  </label>
                  <select
                    id="willingToRelocate"
                    name="willingToRelocate"
                    value={profileDetails.willingToRelocate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="marriagePlan"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiClock className="mr-2" /> Marriage Plan
                  </label>
                  <input
                    type="text"
                    id="marriagePlan"
                    name="marriagePlan"
                    value={profileDetails.marriagePlan}
                    onChange={handleChange}
                    placeholder="e.g., Within 6 months"
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="healthIssues"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiActivity className="mr-2" /> Any Health / Disability
                    Issues?
                  </label>
                  <select
                    id="healthIssues"
                    name="healthIssues"
                    value={profileDetails.healthIssues}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="ethnicGroup"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiGlobe className="mr-2" /> Ethnic Group
                  </label>
                  <input
                    type="text"
                    id="ethnicGroup"
                    name="ethnicGroup"
                    value={profileDetails.ethnicGroup}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="motherTongue"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiMessageSquare className="mr-2" /> Mother Tongue
                  </label>
                  <input
                    type="text"
                    id="motherTongue"
                    name="motherTongue"
                    value={profileDetails.motherTongue}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="languagesSpoken"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <FiMessageSquare className="mr-2" /> Languages Spoken
                  </label>
                  <input
                    type="text"
                    id="languagesSpoken"
                    name="languagesSpoken"
                    value={profileDetails.languagesSpoken}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-black shadow-sm  outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 border border-black rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex items-center"
                >
                  <FiSave className="mr-2" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EditProfile;
