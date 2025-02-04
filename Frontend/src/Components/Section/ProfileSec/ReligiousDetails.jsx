import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";

import { PoliticalViewModal } from "../../Modal/PoliticalViewModal";
import ReligiousServicesModal from "../../Modal/ReligiousServicesModal";
import { PolygamyModal } from "../../Modal/PolygamyModal";
import AtheistModal from "../../Modal/AtheistModal";

function ReligiousDetails({ profileDetails }) {
  const { user_profile } = profileDetails;

  const [isReligiousServicesOpen, setIsReligiousServicesOpen] = useState(false);
  const [isPoliticalViewOpen, setIsPoliticalViewOpen] = useState(false);
  const [isPolygamyOpen, setIsPolygamyOpen] = useState(false);
  const [isAtheistOpen, setIsAtheistOpen] = useState(false);
  const [religiousness, setReligiousness] = useState("");
  const [religiousService, setReligiousService] = useState("");
  const [polygamy, setPolygamy] = useState("");
  const [political, setPolitical] = useState("");

  const handleEdit = (field) => {
    if (field === "ReligiousServices") setIsReligiousServicesOpen(true);
    else if (field === "PoliticalView") setIsPoliticalViewOpen(true);
    else if (field === "Polygamy") setIsPolygamyOpen(true);
    else if (field === "Religiousness") setIsAtheistOpen(true);
  };

  const renderField = (label, value, field, showIcon = false) => (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 cursor-pointer hover:bg-gray-50"
      onClick={() => handleEdit(field)}
    >
      <div>
        <p className="text-sm">{label}</p>
        <p className={`font-medium ${!value ? "text-primary2" : ""}`}>
          {value || `Add ${label}`}
        </p>
      </div>
      {showIcon && <MdChevronRight className="h-5 w-5 text-gray-400" />}
    </div>
  );

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg">

      {renderField("Religion", user_profile.religion, "Religion")}
      {renderField("Community", user_profile.caste, "Community")}
      {renderField("Religiousness", "Add Religiousness", "Religiousness", true)}
      {renderField(
        "Religious Services",
        "Add Religious Services",
        "ReligiousServices",
        true
      )}
      {renderField("Polygamy", "Add Polygamy", "Polygamy", true)}
      {renderField("Political View", "Add Details", "PoliticalView", true)}

      {/* Modals */}
      <ReligiousServicesModal
        open={isReligiousServicesOpen}
        setOpen={setIsReligiousServicesOpen}
        setReligiousService={setReligiousService}
      />
      <PoliticalViewModal
        open={isPoliticalViewOpen}
        setOpen={setIsPoliticalViewOpen}
        setPolitical={setPolitical}
      />
      <PolygamyModal
        open={isPolygamyOpen}
        setOpen={setIsPolygamyOpen}
        setPolygamy={setPolygamy}
      />
      <AtheistModal
        open={isAtheistOpen}
        setOpen={setIsAtheistOpen}
        setReligiousness={setReligiousness}
      />
    </div>
  );
}

export default ReligiousDetails;
