import state_emblem from "../../assets/State Emblem of India.png";

export default function Aadhaar({ data }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <img src={state_emblem} alt="Emblem" className="w-12" />
        <div className="flex-1">
          <div className="bg-[#F6B461] h-7 mb-1 rounded-sm"></div>
          <div className="bg-[#47A047] h-7 rounded-sm flex items-center justify-center">
            <span className="text-white text-sm">GOVERNMENT OF INDIA</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-4">
        {/* Photo Box */}
        <div className="border border-gray-400 w-28 h-32">
          {data.photo ? (
            <img
              src={`data:image/jpeg;base64,${data.photo}`}
              alt="ID Photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              No Photo Available
            </div>
          )}{" "}
        </div>

        {/* Personal Details */}
        <div className="flex-1 text-sm space-y-2">
          <p>Name: {data.name || "XXXX"}</p>
          <p>DOB: {data.date_of_birth || "XX-XX-XXXX"}</p>
          <p>Gender: {data.gender || "MALE"}</p>
          <p>Address: {data.full_address || "Address"}</p>
        </div>
      </div>

      {/* Aadhaar Number */}
      <div className="text-center my-4 text-xl tracking-widest font-mono">
        {data.aadhaar_number || "0000 0000 2222"}
      </div>

      {/* Footer */}
      <div className="text-center text-red-600 text-sm mt-2">
        आधार - आम आदमी का अधिकार
      </div>
    </div>
  );
}
