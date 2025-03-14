import { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import LocationModal from "../../Modal/LocationModal";
import SecondaryNumberModal from "../../Modal/SecondaryNumberModal";
import TimeToCallModal from "../../Modal/TimeToCallModal";
import FullAddressModal from "../../Modal/FullAddressModal";

export default function ContactDetails({ profileDetails, fetchDetails }) {
  const { user_profile, groom_bride_info } = profileDetails || {};
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openSecondaryNumberModal, setOpenSecondaryNumberModal] =
    useState(false);
  const [location, setLocation] = useState(
    groom_bride_info?.present_city &&
      groom_bride_info?.present_state &&
      groom_bride_info?.present_country
      ? `${groom_bride_info.present_city}, ${groom_bride_info.present_state}, ${groom_bride_info.present_country}`
      : "Add Present Location"
  );
  const [secondaryNumber, setSecondaryNumber] = useState(
    groom_bride_info?.secondary_mobileno
      ? groom_bride_info.secondary_mobileno
      : "Add Secondary Number"
  );
  const [openTimeToCallModal, setOpenTimeToCallModal] = useState(false);
  const [openFullAddressModal, setOpenFullAddressModal] = useState(false);
  const [timeToCall, setTimeToCall] = useState(
    groom_bride_info?.time_to_call
      ? groom_bride_info.time_to_call
      : "Add convenient Time to call"
  );
  const [fullAddress, setFullAddress] = useState(
    groom_bride_info?.address ? groom_bride_info.address : "Add Address"
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Location & Contact Details
        </h2>
      </div>

      <div className="space-y-6 mt-5">
        <div className="space-y-4">
          <DetailSection
            title="Present Location"
            value={location}
            isAdd={true}
            onClick={() => setOpenLocationModal(true)}
          />
          <DetailSection
            title="Home Location"
            value={`${groom_bride_info?.city}, ${groom_bride_info?.state}, ${groom_bride_info?.country}`}
            isAdd={false}
          />
        </div>

        <div className="space-y-6 bg-gray50 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center gap-3 bg-button p-5 rounded-3xl text-white">
            <FaUsers className="h-6 w-6 " />
            <span className="text-sm ">Visible only to Premium Members.</span>
          </div>
          <DetailSection
            title="Primary Number"
            value={user_profile?.user?.mobileno || "N/A"}
            isAdd={false}
          />
          <DetailSection
            title="Secondary Number"
            value={secondaryNumber}
            isAdd={true}
            onClick={() => setOpenSecondaryNumberModal(true)}
          />
          <DetailSection
            title="Email"
            value={user_profile?.user?.email || "N/A"}
            isAdd={false}
          />
          <DetailSection
            title="Time to Call"
            value={timeToCall || "Add convenient Time to call"}
            isAdd={true}
            onClick={() => setOpenTimeToCallModal(true)}
          />

          {/* Full Address */}
          <DetailSection
            title="Full Address"
            value={fullAddress || "Add Address"}
            isAdd={true}
            onClick={() => setOpenFullAddressModal(true)}
          />
        </div>
      </div>

      {/* Location Modal */}
      {openLocationModal && (
        <LocationModal
          openModal={openLocationModal}
          setOpenModal={setOpenLocationModal}
          fetchDetails={fetchDetails}
          setLocation={setLocation}
        />
      )}

      {/* Secondary Number Modal */}
      {openSecondaryNumberModal && (
        <SecondaryNumberModal
          openModal={openSecondaryNumberModal}
          setOpenModal={setOpenSecondaryNumberModal}
          setSecondaryNumber={setSecondaryNumber} // Set the value for secondary number
        />
      )}
      {/* Time to Call Modal */}
      {openTimeToCallModal && (
        <TimeToCallModal
          openModal={openTimeToCallModal}
          setOpenModal={setOpenTimeToCallModal}
          setTimeToCall={setTimeToCall}
        />
      )}

      {/* Full Address Modal */}
      {openFullAddressModal && (
        <FullAddressModal
          openModal={openFullAddressModal}
          setOpenModal={setOpenFullAddressModal}
          setFullAddress={setFullAddress}
        />
      )}
    </>
  );
}

const DetailSection = ({ title, value, isAdd = false, onClick }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-black">{title}</h3>
      <button
        onClick={onClick}
        className={`flex items-center justify-between w-full text-left ${
          isAdd ? "text-blue-500" : "text-gray-800"
        } font-normal hover:text-red hover:underline`}
      >
        <span>{value}</span>
        {isAdd && <MdChevronRight className="h-5 w-5" />}
      </button>
    </div>
  );
};
