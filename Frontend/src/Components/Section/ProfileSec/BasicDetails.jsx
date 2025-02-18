import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { IoMdCloseCircleOutline } from "react-icons/io";

languages.registerLocale(en);

function BasicDetails({ profileDetails, fetchDetails }) {
  const { user_profile } = profileDetails || {};
  const allLanguages = languages.getNames("en");

  const availableLanguages = Object.entries(allLanguages).map(
    ([code, name]) => ({
      key: name,
      label: name,
    })
  );

  const initialLanguages = new Set(
    user_profile?.languages_spoken?.split(",") || []
  );
  const [selectedLanguages, setSelectedLanguages] = useState(initialLanguages);

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`${requests.editLanguages}`, {
        action: "add",
        languages_spoken: Array.from(selectedLanguages).join(","),
      });
      fetchDetails();
    } catch (error) {
      console.error("Error updating languages:", error);
    }
  };

  const handleLanguageRemove = async (language) => {
    const updatedLanguages = new Set(selectedLanguages);
    updatedLanguages.delete(language);
    setSelectedLanguages(updatedLanguages);

    try {
      const response = await axiosInstance.post(`${requests.editLanguages}`, {
        action: "remove",
        languages_spoken: language,
      });
      fetchDetails();
    } catch (error) {
      console.error("Error updating languages:", error);
    }
  };

  const combinedLanguages = [
    ...new Set([
      ...(user_profile?.languages_spoken
        ? user_profile.languages_spoken.split(",")
        : []),
      ...Array.from(selectedLanguages),
    ]),
  ];

  const isSubmitButtonVisible = selectedLanguages.size > initialLanguages.size;

  const details = [
    { label: "Name", value: user_profile?.name || "N/A" },
    { label: "Profile ID", value: user_profile?.user?.unique_id || "N/A" },
    {
      label: "Gender",
      value: user_profile?.user?.gender === 2 ? "Female" : "Male",
    },
    { label: "Marital Status", value: user_profile?.marital_status || "N/A" },
    { label: "Creating Profile for", value: "My Self" },
    {
      label: "Any Health / Disability Issues?",
      value: user_profile?.physical_challenges ? "Yes" : "No",
    },
    { label: "Mother Tongue", value: user_profile?.mother_tongue || "N/A" },
  ];

  return (
    <>
      <div className="flex items-center justify-between m-3">
        <h1 className="text-2xl font-semibold">Basic Details</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="text-black">{detail.label}</div>
            <div className="text-black">{detail.value}</div>
          </div>
        ))}

        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4">
            <div className="text-black">Languages Spoken</div>
            <Select
              selectionMode="multiple"
              placeholder="Select languages"
              selectedKeys={selectedLanguages}
              onSelectionChange={(keys) => setSelectedLanguages(new Set(keys))}
              className="w-60"
              disallowEmptySelection={false}
              searchable
            >
              {availableLanguages.map((language) => (
                <SelectItem
                  key={language.key}
                  value={language.label}
                  className="bg-white"
                >
                  {language.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="p-4 flex flex-wrap gap-2">
            {combinedLanguages.map((language, index) => (
              <span
                key={index}
                className="bg-red flex items-center gap-3 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
              >
                {language}
                <IoMdCloseCircleOutline
                  className="text-xl"
                  onClick={() => handleLanguageRemove(language)}
                />
              </span>
            ))}
          </div>

          {isSubmitButtonVisible && (
            <div className="p-4">
              <button
                className="bg-button p-2 text-white rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BasicDetails;
