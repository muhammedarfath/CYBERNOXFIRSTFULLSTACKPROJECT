import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import AgeModal from "../../Modal/AgeModal";


function PartnerPreferences({ preferences }) {
  const [agePreference, setAgePreference] = useState(preferences?.age_preference || "");
  const [heightPreference, setHeightPreference] = useState(preferences?.height_preference || "");
  const [maritalStatus, setMaritalStatus] = useState(preferences?.marital_status || "");

  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isHeightModalOpen, setIsHeightModalOpen] = useState(false);
  const [isMaritalModalOpen, setIsMaritalModalOpen] = useState(false);

  const handleOpenAgeModal = () => setIsAgeModalOpen(true);
  const handleOpenHeightModal = () => setIsHeightModalOpen(true);
  const handleOpenMaritalModal = () => setIsMaritalModalOpen(true);

  const details = [
    { label: "Age Preference", value: agePreference, isAction: true, onClick: handleOpenAgeModal },
    { label: "Height Preference", value: heightPreference, isAction: true, onClick: handleOpenHeightModal },
    { label: "Marital Status", value: maritalStatus, isAction: true, onClick: handleOpenMaritalModal },
    { label: "Physical Status", value: preferences?.physical_status },
    { label: "Drinking Preference", value: preferences?.drinking_preference },
    { label: "Smoking Preference", value: preferences?.smoking_preference },
    { label: "Mother Tongue", value: preferences?.mother_tongue },
    { label: "Education", value: preferences?.education },
    { label: "Profession", value: preferences?.profession },
    { label: "Annual Income", value: preferences?.annual_income },
    { label: "Partner District", value: preferences?.partner_district },
    { label: "Partner Country", value: preferences?.partner_country },
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

      {/* Modals */}
      {isAgeModalOpen && (
        <AgeModal open={isAgeModalOpen} setOpen={setIsAgeModalOpen} setAgePreference={setAgePreference} />
      )}
      {/* {isHeightModalOpen && (
        <HeightPreferenceModal open={isHeightModalOpen} setOpen={setIsHeightModalOpen} setHeightPreference={setHeightPreference} />
      )}
      {isMaritalModalOpen && (
        <MaritalStatusModal open={isMaritalModalOpen} setOpen={setIsMaritalModalOpen} setMaritalStatus={setMaritalStatus} />
      )} */}
    </div>
  );
}

export default PartnerPreferences;
