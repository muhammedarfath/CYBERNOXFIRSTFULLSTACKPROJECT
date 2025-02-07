import React, { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";

function EditProfile({ isOpen, onOpenChange, profileDetails }) {
  const [profileData, setProfileData] = useState({
    familyType: "Single",
    financialStatus: "Middle Class",
    homeType: "Apartment",
    livingSituation: "With Parents",
    fatherName: "Add Father Name",
    fatherAlive: "Add Father Details",
    fathersOccupation: "Engineer",
    motherName: "Add Mother Name",
    motherAlive: "Add Mother Details",
    mothersOccupation: "Teacher",
    noBrothers: "0",
    noMarriedBrothers: "0",
    noSisters: "0",
    noMarriedSisters: "0",
    familyDetails: "Add Family Details",
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
              <TbUserEdit className="mr-2" /> Edit Family & Living Details
            </h2>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <CgClose size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-2">
                <label
                  htmlFor="familyType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Family Type
                </label>
                <select
                  id="familyType"
                  name="familyType"
                  value={profileData.familyType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="Single">Single</option>
                  <option value="Joint">Joint</option>
                  <option value="Nuclear">Nuclear</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="financialStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Financial Status
                </label>
                <select
                  id="financialStatus"
                  name="financialStatus"
                  value={profileData.financialStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="Lower Class">Lower Class</option>
                  <option value="Middle Class">Middle Class</option>
                  <option value="Upper Class">Upper Class</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="fatherName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Father Name
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={profileData.fatherName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="fatherAlive"
                  className="block text-sm font-medium text-gray-700"
                >
                  Father Alive or Not?
                </label>
                <input
                  type="text"
                  id="fatherAlive"
                  name="fatherAlive"
                  value={profileData.fatherAlive}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="noBrothers"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Brothers
                </label>
                <input
                  type="text"
                  id="noBrothers"
                  name="noBrothers"
                  value={profileData.noBrothers}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="noMarriedBrothers"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Married Brothers
                </label>
                <input
                  type="text"
                  id="noMarriedBrothers"
                  name="noMarriedBrothers"
                  value={profileData.noMarriedBrothers}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              {/* Right column */}
              <div className="space-y-2">
                <label
                  htmlFor="homeType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Home Type
                </label>
                <select
                  id="homeType"
                  name="homeType"
                  value={profileData.homeType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="livingSituation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Living Situation
                </label>
                <select
                  id="livingSituation"
                  name="livingSituation"
                  value={profileData.livingSituation}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="With Parents">With Parents</option>
                  <option value="Alone">Alone</option>
                  <option value="With Spouse">With Spouse</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="fathersOccupation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Father's Occupation
                </label>
                <select
                  id="fathersOccupation"
                  name="fathersOccupation"
                  value={profileData.fathersOccupation}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="Engineer">Engineer</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Businessman">Businessman</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Farmer">Farmer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mothersOccupation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother's Occupation
                </label>
                <select
                  id="mothersOccupation"
                  name="mothersOccupation"
                  value={profileData.mothersOccupation}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Housewife">Housewife</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Businesswoman">Businesswoman</option>
                  <option value="Farmer">Farmer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="motherName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother Name
                </label>
                <input
                  type="text"
                  id="motherName"
                  name="motherName"
                  value={profileData.motherName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="motherAlive"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother Alive or Not?
                </label>
                <input
                  type="text"
                  id="motherAlive"
                  name="motherAlive"
                  value={profileData.motherAlive}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="familyDetails"
                  className="block text-sm font-medium text-gray-700"
                >
                  Family Details
                </label>
                <textarea
                  id="familyDetails"
                  name="familyDetails"
                  value={profileData.familyDetails}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-black shadow-sm outline-none"
                ></textarea>
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

export default EditProfile;