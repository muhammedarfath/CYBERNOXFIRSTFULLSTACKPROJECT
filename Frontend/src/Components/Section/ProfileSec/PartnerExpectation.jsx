import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import AgeModal from "../../Modal/AgeModal";
import HeightModal from "../../Modal/HeightModal";
import MaritalModal from "../../Modal/MaritalModal";
import PhysicalModal from "../../Modal/PhysicalModal";
import DrinkingModal from "../../Modal/DrinkingModal";
import SmokingModal from "../../Modal/SmokingModal";
import MotherTongueModal from "../../Modal/MotherTongueModal";
import EducationModal from "../../Modal/EducationModal";
import ProfessionModal from "../../Modal/ProfessionModal";
import IncomeModal from "../../Modal/IncomeModal";
import CountryModal from "../../Modal/CountryModal";

function PartnerPreferences({ preferences }) {
  const [agePreference, setAgePreference] = useState(
    preferences.partner_preferences?.age_preference || ""
  );
  const [heightPreference, setHeightPreference] = useState(
    preferences.partner_preferences?.height_preference || ""
  );
  const [maritalStatus, setMaritalStatus] = useState(
    preferences.partner_preferences?.marital_status || ""
  );
  const [physicalStatus, setPhysicalStatus] = useState(
    preferences.partner_preferences?.physical_status || ""
  );
  const [drinkingStatus, setDrinkingStatus] = useState(
    preferences.partner_preferences?.drinking_preference || ""
  );
  const [smokingStatus, setSmokingStatus] = useState(
    preferences.partner_preferences?.smoking_preference || ""
  );
  const [motherTongueStatus, setMotherTongueStatus] = useState(
    preferences.partner_preferences?.mother_tongue || ""
  );
  const [educationStatus, setEducationStatus] = useState(
    preferences.partner_preferences?.education || ""
  );
  const [professionfStatus, setProfessionfStatus] = useState(
    preferences.partner_preferences?.profession || ""
  );
  const [incomeStatus, setIncomeStatus] = useState(
    preferences.partner_preferences?.annual_income || ""
  );
  const [countryStatus, setCountryStatus] = useState(
    preferences.partner_preferences?.partner_country || ""
  );

  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isHeightModalOpen, setIsHeightModalOpen] = useState(false);
  const [isMaritalModalOpen, setIsMaritalModalOpen] = useState(false);
  const [isPhysicalModalOpen, setIsPhysicalModalOpen] = useState(false);
  const [isDrinkingModalOpen, setIsDrinkingModalOpen] = useState(false);
  const [isSmokingModalOpen, setIsSmokingModalOpen] = useState(false);
  const [isMotherTongueModalOpen, setIMotherTonguesModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isProfessionModalOpen, setIsProfessionModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const handleOpenAgeModal = () => setIsAgeModalOpen(true);
  const handleOpenHeightModal = () => setIsHeightModalOpen(true);
  const handleOpenMaritalModal = () => setIsMaritalModalOpen(true);
  const handleOpenPhysicalModal = () => setIsPhysicalModalOpen(true);
  const handleOpenDrinkingModal = () => setIsDrinkingModalOpen(true);
  const handleOpenSmokingModal = () => setIsSmokingModalOpen(true);
  const handleOpenMotherTongueModal = () => setIMotherTonguesModalOpen(true);
  const handleOpenEducationModal = () => setIsEducationModalOpen(true);
  const handleOpenProfessionModal = () => setIsProfessionModalOpen(true);
  const handleOpenIncomeModal = () => setIsIncomeModalOpen(true);
  const handleOpenCountryModal = () => setIsCountryModalOpen(true);

  const details = [
    {
      label: "Age Preference",
      value: agePreference,
      onClick: handleOpenAgeModal,
    },
    {
      label: "Height Preference",
      value: heightPreference,
      onClick: handleOpenHeightModal,
    },
    {
      label: "Marital Status",
      value: maritalStatus,
      onClick: handleOpenMaritalModal,
    },
    {
      label: "Physical Status",
      value: physicalStatus,
      onClick: handleOpenPhysicalModal,
    },
    {
      label: "Drinking Preference",
      value: drinkingStatus,
      onClick: handleOpenDrinkingModal,
    },
    {
      label: "Smoking Preference",
      value: smokingStatus,
      onClick: handleOpenSmokingModal,
    },
    {
      label: "Mother Tongue",
      value: motherTongueStatus,
      onClick: handleOpenMotherTongueModal,
    },
    {
      label: "Education",
      value: educationStatus,
      onClick: handleOpenEducationModal,
    },
    {
      label: "Profession",
      value: professionfStatus,
      onClick: handleOpenProfessionModal,
    },
    {
      label: "Annual Income",
      value: incomeStatus,
      onClick: handleOpenIncomeModal,
    },
    {
      label: "Partner Country",
      value: countryStatus,
      onClick: handleOpenCountryModal,
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
            <div className="flex items-center">
              {detail.value ? (
                Array.isArray(detail.value) ? (
                  <div className="details-grid">
                    {detail.value.map((part, idx) => (
                      <div
                        key={idx}
                        className="bg-red flex items-center gap-3 text-white px-3 py-1 rounded-full text-sm"
                      >
                        <span>{part.trim()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="details-grid-profile">
                    {detail.value.split(",").map((part, idx) => (
                      <div
                        key={idx}
                        className="bg-red flex items-center gap-3 text-white px-3 py-1 rounded-full text-sm"
                      >
                        <span>{part.trim()}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <span className="text-primary2">{`Add ${detail.label}`}</span>
              )}

              <MdChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      {/* Modals */}
      {isAgeModalOpen && (
        <AgeModal
          open={isAgeModalOpen}
          setOpen={setIsAgeModalOpen}
          setAgePreference={setAgePreference}
        />
      )}
      {isHeightModalOpen && (
        <HeightModal
          open={isHeightModalOpen}
          setOpen={setIsHeightModalOpen}
          setHeightPreference={setHeightPreference}
        />
      )}
      {isMaritalModalOpen && (
        <MaritalModal
          open={isMaritalModalOpen}
          setOpen={setIsMaritalModalOpen}
          setMaritalStatus={setMaritalStatus}
        />
      )}
      {isPhysicalModalOpen && (
        <PhysicalModal
          open={isPhysicalModalOpen}
          setOpen={setIsPhysicalModalOpen}
          setPhysicalStatus={setPhysicalStatus}
        />
      )}
      {isDrinkingModalOpen && (
        <DrinkingModal
          open={isDrinkingModalOpen}
          setOpen={setIsDrinkingModalOpen}
          setDrinkingPreference={setDrinkingStatus}
        />
      )}
      {isSmokingModalOpen && (
        <SmokingModal
          open={isSmokingModalOpen}
          setOpen={setIsSmokingModalOpen}
          setSmokingPreference={setSmokingStatus}
        />
      )}
      {isMotherTongueModalOpen && (
        <MotherTongueModal
          open={isMotherTongueModalOpen}
          setOpen={setIMotherTonguesModalOpen}
          setMotherTongueStatus={setMotherTongueStatus}
        />
      )}
      {isEducationModalOpen && (
        <EducationModal
          open={isEducationModalOpen}
          setOpen={setIsEducationModalOpen}
          setEducationPreference={setEducationStatus}
        />
      )}
      {isProfessionModalOpen && (
        <ProfessionModal
          open={isProfessionModalOpen}
          setOpen={setIsProfessionModalOpen}
          setProfessionPreference={setProfessionfStatus}
        />
      )}
      {isIncomeModalOpen && (
        <IncomeModal
          open={isIncomeModalOpen}
          setOpen={setIsIncomeModalOpen}
          setIncomePreference={setIncomeStatus}
        />
      )}
      {isCountryModalOpen && (
        <CountryModal
          open={isCountryModalOpen}
          setOpen={setIsCountryModalOpen}
          setCountryStatus={setCountryStatus}
          
        />
      )}
    </div>
  );
}

export default PartnerPreferences;