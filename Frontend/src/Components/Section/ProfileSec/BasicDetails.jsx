import React from "react";
import { useDisclosure } from "@nextui-org/react";
import { TbUserEdit } from "react-icons/tb";
import EditProfile from "../../Modal/EditProfile";

function BasicDetails() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const details = [
    { label: "Name", value: "Muhammed Arfath" },
    { label: "Profile ID", value: "WT3677639" },
    { label: "Age", value: "21 Yrs" },
    { label: "Gender", value: "Male" },
    { label: "Marital Status", value: "Never Married" },
    { label: "Creating Profile for", value: "My Self" },
    { label: "Any Health / Disability Issues?", value: "No" },
    { label: "Ethnic Group", value: "Add Ethnicity", action: true },
    { label: "Mother Tongue", value: "Add Mother Tongue", action: true },
    { label: "Languages Spoken", value: "Add Language", action: true },
  ];

  return (
    <>
      <div className="flex items-center justify-between m-3">
        <h1 className="text-2xl font-semibold">Basic Details</h1>
        <TbUserEdit
          onClick={onOpen}
          className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400"
        />
      </div>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="text-black">{detail.label}</div>
            <div className="flex items-center gap-2">
              <span className={detail.action ? "text-primary2" : "text-black"}>
                {detail.value}
              </span>
            </div>
          </div>
        ))}
        <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </>
  );
}

export default BasicDetails;
