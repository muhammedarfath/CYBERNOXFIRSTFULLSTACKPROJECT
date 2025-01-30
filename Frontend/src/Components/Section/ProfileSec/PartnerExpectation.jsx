import React, { useState } from "react";
import { TbChevronRight, TbUserEdit } from "react-icons/tb";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import Option from "../../Modal/Option";

function PartnerExpectation() {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [field, setField] = useState("");
  const [loadingFields, setLoadingFields] = useState({});

  const handleOpenModal = (title, fie) => {
    setModalTitle(title);
    setOpenModal(true);
    setField(fie);
    fetchOptions(fie);
  };

  const fetchOptions = async (field) => {
    try {
      setLoadingFields((prev) => ({ ...prev, [field]: true }));

      let apiUrl = "";
      switch (field) {
        case "age":
          apiUrl = "/api/partner-age-preferences";
          break;
        case "height":
          apiUrl = "/api/partner-height-preferences";
          break;
        case "marital":
          apiUrl = `${requests.fetchMaritalStatus}`;
          break;
        case "physical_status":
          apiUrl = `${requests.fetchPhysicalStatus}`;
          break;
        case "drinking_preference":
          apiUrl = `${requests.fetchDrinkingStatus}`;
          break;
        case "smoking_preference":
          apiUrl = `${requests.fetchSmokingStatus}`;
          break;
        case "education":
          apiUrl = "/api/partner-education-preferences";
          break;
        case "profession":
          apiUrl = "/api/partner-profession-preferences";
          break;
        case "income":
          apiUrl = "/api/partner-income-preferences";
          break;
        case "district":
          apiUrl = "/api/partner-district-preferences";
          break;
        case "country":
          apiUrl = "/api/partner-country-preferences";
          break;
        default:
          throw new Error("Unknown field");
      }

      const response = await axiosInstance.get(apiUrl);
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoadingFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSave = () => {
    console.log("Selected Value:", selectedValue);
    setOpenModal(false);
  };

  return (
    <div className="w-full mx-auto mb-40">
      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Partner Basic Preferences</h2>
          <TbUserEdit
            className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400"
            onClick={() => handleOpenModal("Partner Age Preference", "age")}
          />
        </div>
        <div className="divide-y divide-gray-200">
          <PreferenceItem
            label="Partner Age Preference"
            value="Add Age Preferences"
            isAction={true}
            loading={loadingFields.age}
            onClick={() => handleOpenModal("Partner Age Preference", "age")}
          />
          <PreferenceItem
            label="Partner Height Preference"
            value="Add Height Preferences"
            isAction={true}
            loading={loadingFields.height}
            onClick={() =>
              handleOpenModal("Partner Height Preference", "height")
            }
          />
          <PreferenceItem
            label="Partner Marital Status Preference"
            value="Does not matter"
            onClick={() =>
              handleOpenModal("Partner Marital Status Preference", "marital")
            }
          />
          <PreferenceItem
            label="Partner Physical Status Preference"
            value={selectedValue.physical_status || "Does not matter"}
            loading={loadingFields.physical_status}
            onClick={() =>
              handleOpenModal(
                "Partner Physical Status Preference",
                "physical_status"
              )
            }
          />
          <PreferenceItem
            label="Partner Drinking Preference"
            value="Does not matter"
            loading={loadingFields.drinking_preference}
            onClick={() =>
              handleOpenModal(
                "Partner Drinking Preference",
                "drinking_preference"
              )
            }
          />
          <PreferenceItem
            label="Partner Smoking Preference"
            value="Does not matter"
            loading={loadingFields.smoking_preference}
            onClick={() =>
              handleOpenModal(
                "Partner Smoking Preference",
                "smoking_preference"
              )
            }
          />
          <PreferenceItem
            label="Partner Language Preference"
            value="Does not matter"
          />
        </div>
      </div>

      {/* Education & Professional Preferences Section */}
      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Education & Professional Preferences
          </h2>
          <TbUserEdit
            className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400"
            onClick={() =>
              handleOpenModal("Partner Education Preferences", "education")
            }
          />
        </div>
        <div className="divide-y divide-gray-200">
          <PreferenceItem
            label="Partner Education Preferences"
            value="Does not matter"
            loading={loadingFields.education}
            onClick={() =>
              handleOpenModal("Partner Education Preferences", "education")
            }
          />
          <PreferenceItem
            label="Partner Profession Preferences"
            value="Does not matter"
            loading={loadingFields.profession}
            onClick={() =>
              handleOpenModal("Partner Profession Preferences", "profession")
            }
          />
          <PreferenceItem
            label="Partner Annual Income"
            value="Does not matter"
            loading={loadingFields.income}
            onClick={() => handleOpenModal("Partner Annual Income", "income")}
          />
        </div>
      </div>

      {/* Location Preferences Section */}
      <div className="mb-6 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Partner Location Preferences
          </h2>
          <TbUserEdit
            className="text-2xl bg-button rounded-xl text-white p-1 cursor-pointer text-gray-400"
            onClick={() =>
              handleOpenModal("Partner District Preferences", "district")
            }
          />
        </div>
        <div className="divide-y divide-gray-200">
          <PreferenceItem
            label="Partner District Preferences"
            value="Add Partner District Preferences"
            isAction={true}
            loading={loadingFields.district}
            onClick={() =>
              handleOpenModal("Partner District Preferences", "district")
            }
          />
          <PreferenceItem
            label="Partner Present Country Preferences"
            value="Add Nationality"
            isAction={true}
            loading={loadingFields.country}
            onClick={() =>
              handleOpenModal("Partner Present Country Preferences", "country")
            }
          />
        </div>
      </div>

      <Option
        openModal={openModal}
        modalTitle={modalTitle}
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        handleSave={handleSave}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}

function PreferenceItem({ label, value, isAction, onClick, loading }) {
  return (
    <div
      className="flex flex-col p-4 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <span className="text-gray-600 text-sm mb-1">{label}</span>
      <div className="flex items-center justify-between">
        {loading ? (
          <span className="text-gray-500 text-lg">Loading...</span>
        ) : (
          <span
            className={`text-lg ${
              isAction ? "text-primary2" : "text-gray-900"
            }`}
          >
            {value}
          </span>
        )}
        <TbChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

export default PartnerExpectation;
