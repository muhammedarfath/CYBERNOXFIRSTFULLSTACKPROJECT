import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import HomeTypeModal from "../../Modal/HomeTypeModal";
import LivingSituationModal from "../../Modal/LivingSituationModal";
import MotherNameModal from "../../Modal/MotherNameModal"; // Import the MotherNameModal component

function FamilyDetails({ profileDetails }) {
  const { family_info } = profileDetails;
  const [isHomeTypeModalOpen, setIsHomeTypeModalOpen] = useState(false);
  const [isLivingSituationModalOpen, setIsLivingSituationModalOpen] = useState(false);
  const [isMotherNameModalOpen, setIsMotherNameModalOpen] = useState(false); 
  const [homeType, setHomeType] = useState(family_info?.home_type || "");
  const [livingSituation, setLivingSituation] = useState(family_info?.living_situation || "");
  const [motherName, setMotherName] = useState(family_info?.mother_name || "");

  const handleOpenHomeTypeModal = () => {
    setIsHomeTypeModalOpen(true);
  };

  const handleOpenLivingSituationModal = () => {
    setIsLivingSituationModalOpen(true);
  };

  const handleOpenMotherNameModal = () => {
    setIsMotherNameModalOpen(true);
  };

  const details = [
    { label: "Family Type", value: family_info?.family_type, isAction: true },
    { label: "Financial Status", value: family_info?.family_status },
    { label: "Home Type", value: homeType, isAction: true, onClick: handleOpenHomeTypeModal },
    { label: "Living Situation", value: livingSituation, isAction: true, onClick: handleOpenLivingSituationModal },
    { label: "Father Name", value: family_info?.father_name, isAction: true },
    { label: "Father Alive or Not?", value: family_info?.father_alive, isAction: true },
    { label: "Father's Occupation", value: family_info?.father_occupation, isAction: true },
    { label: "Mother Name", value: motherName, isAction: true, onClick: handleOpenMotherNameModal },
    { label: "Mother Alive or Not?", value: family_info?.mother_alive, isAction: true },
    { label: "Mother's Occupation", value: family_info?.mother_occupation, isAction: true },
    { label: "No. Brothers", value: family_info?.number_of_brothers ?? "0" },
    { label: "No. Married Brothers", value: family_info?.married_brothers ?? "0" },
    { label: "No. Sisters", value: family_info?.number_of_sisters ?? "0" },
    { label: "No. Married Sisters", value: family_info?.married_sisters ?? "0" },
    { label: "Family Details", value: family_info?.family_description, isAction: true },
  ];

  return (
    <div className="w-full mx-auto p-3">
      <div className="space-y-1">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
            onClick={detail.onClick} 
          >
            <span className="text-gray-700 text-lg">{detail.label}</span>
            <div className="flex items-center">
              <span className={detail.value ? "text-gray-900" : "text-primary2"}>
                {detail.value || `Add ${detail.label}`}
              </span>
              {!detail.value && <MdChevronRight className="h-5 w-5 text-gray-400" />}
            </div>
          </div>
        ))}
      </div>

      {/* Home Type Modal */}
      {isHomeTypeModalOpen && (
        <HomeTypeModal
          open={isHomeTypeModalOpen}
          setOpen={setIsHomeTypeModalOpen}
          setHomeType={setHomeType}
        />
      )}

      {/* Living Situation Modal */}
      {isLivingSituationModalOpen && (
        <LivingSituationModal
          open={isLivingSituationModalOpen}
          setOpen={setIsLivingSituationModalOpen}
          setLivingSituation={setLivingSituation}
        />
      )}

      {/* Mother Name Modal */}
      {isMotherNameModalOpen && (
        <MotherNameModal
          open={isMotherNameModalOpen}
          setOpen={setIsMotherNameModalOpen}
          setMotherName={setMotherName}
        />
      )}
    </div>
  );
}

export default FamilyDetails;
