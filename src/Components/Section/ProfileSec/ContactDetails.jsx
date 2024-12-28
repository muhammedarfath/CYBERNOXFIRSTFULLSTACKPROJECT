import { MdChevronRight } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function ContactDetails({
  presentLocation = "Cheruvannur, Kozhikode, Kerala, India",
  homeLocation = "Cheruvannur, Kozhikode, Kerala, India",
  primaryNumber = "+91 7907224281",
  email = "mhdarfath868@gmail.com",
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Location & Contact Details
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <DetailSection
            title="Present Location"
            value={presentLocation}
          />
          <DetailSection
            title="Home Location"
            value={homeLocation}
          />
          <DetailSection
            title="Grew up in"
            value="Add Grew Up"
            isAdd={true}
          />
        </div>

        <div className="space-y-6 bg-gray-50 rounded-lg border p-6 shadow-sm">
          <div className="flex items-center gap-3 bg-button p-5 rounded-3xl text-white">
            <FaUsers className="h-6 w-6 " />
            <span className="text-sm ">
              Visible only to Premium Members.
            </span>
          </div>
          <DetailSection title="Primary Number" value={primaryNumber} />
          <DetailSection
            title="Secondary Number"
            value="Add Secondary Number"
            isAdd={true}
          />
          <DetailSection title="Email" value={email} />
          <DetailSection
            title="Contact type"
            value="Add Contact type"
            isAdd={true}
          />
          <DetailSection
            title="Time to call"
            value="Add Time to call"
            isAdd={true}
          />
          <DetailSection
            title="Contact person"
            value="Add Contact person"
            isAdd={true}
          />
          <DetailSection
            title="Full Address"
            value="Add Address"
            isAdd={true}
          />
        </div>
      </div>
    </>
  );
}

const DetailSection = ({ title, value, isAdd = false }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <button
        className={`flex items-center justify-between w-full text-left ${
          isAdd ? "text-blue-500" : "text-gray-800"
        } font-normal hover:text-blue-600 hover:underline`}
      >
        <span>{value}</span>
        <MdChevronRight className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
};
