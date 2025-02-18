import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import SkinColorModal from "../../Modal/SkinColorModal";
import BloodGroupModal from "../../Modal/BloodGroupModal";
import HairColorModal from "../../Modal/HairColorModal";
import HairTypeModal from "../../Modal/HairTypeModal";
import AppearanceModal from "../../Modal/AppearanceModal";

function PhysicalDetails({ profileDetails }) {
  const { user_profile } = profileDetails;
  const [isSkinColorModalOpen, setSkinColorModalOpen] = useState(false);
  const [isBloodGroupModalOpen, setBloodGroupModalOpen] = useState(false);
  const [isHairColorModalOpen, setHairColorModalOpen] = useState(false);
  const [isHairTypeModalOpen, setHairTypeModalOpen] = useState(false);
  const [skinColor, setSkinColor] = useState(user_profile.skin_color || "N/A");
  const [bloodGroup, setBloodGroup] = useState(
    user_profile.blood_group || "N/A"
  );
  const [hairColor, setHairColor] = useState(user_profile.hair_color || "N/A");
  const [hairType, setHairType] = useState(user_profile.hair_type || "N/A");
  const [appearance, setAppearance] = useState(
    user_profile.appearance || "N/A"
  );
  const [isAppearanceModalOpen, setAppearanceModalOpen] = useState(false);

  const details = [
    { label: "Height", value: user_profile.height || "N/A" },
    { label: "Weight", value: user_profile.weight || "N/A" },
    {
      label: "Skin Color",
      value: skinColor,
      isAction: true,
      onClick: () => setSkinColorModalOpen(true),
    },
    {
      label: "Blood Group",
      value: bloodGroup,
      isAction: true,
      onClick: () => setBloodGroupModalOpen(true),
    },
    { label: "Body type", value: user_profile.body_type || "N/A" },
    {
      label: "Hair Color",
      value: hairColor,
      isAction: true,
      onClick: () => setHairColorModalOpen(true),
    },
    {
      label: "Hair Type",
      value: hairType,
      isAction: true,
      onClick: () => setHairTypeModalOpen(true),
    },
    {
      label: "Appearance",
      value: appearance,
      isAction: true,
      onClick: () => setAppearanceModalOpen(true),
    },
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
            <div className="flex items-center gap-2">
              <span
                className={detail.isAction ? "text-primary2" : "text-gray-900"}
              >
                {detail.value}
              </span>
              {detail.isAction && (
                <MdChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      <SkinColorModal
        open={isSkinColorModalOpen}
        setOpen={setSkinColorModalOpen}
        setSkinColor={setSkinColor}
      />

      <BloodGroupModal
        open={isBloodGroupModalOpen}
        setOpen={setBloodGroupModalOpen}
        setBloodGroup={setBloodGroup}
      />

      <HairColorModal
        open={isHairColorModalOpen}
        setOpen={setHairColorModalOpen}
        setHairColor={setHairColor}
      />

      <HairTypeModal
        open={isHairTypeModalOpen}
        setOpen={setHairTypeModalOpen}
        setHairType={setHairType}
      />

      <AppearanceModal
        open={isAppearanceModalOpen}
        setOpen={setAppearanceModalOpen}
        setAppearance={setAppearance}
      />
    </div>
  );
}

export default PhysicalDetails;
