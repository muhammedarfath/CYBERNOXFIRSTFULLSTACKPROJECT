import React from "react";

function ProfileDetailOther({ slide }) {
  const { user_profile, groom_bride_info, family_info } = slide;

  return (
    <>
      <h3 className="font-semibold mb-3 mt-6">Basic Details</h3>
      <div className="space-y-4 mb-6">
        <DetailItem label="Name" value={user_profile?.name} />
        <DetailItem label="Age" value={`${new Date().getFullYear() - new Date(user_profile?.date_of_birth).getFullYear()} Yrs`} />
        <DetailItem label="Height" value={`${user_profile?.height} cm`} />
        <DetailItem label="Weight" value={`${user_profile?.weight} Kg`} />
        <DetailItem label="Body Type" value={user_profile?.body_type} />
        <DetailItem label="Skin Color" value={user_profile?.skin_color} />
        <DetailItem label="Hair Color" value={user_profile?.hair_color} />
        <DetailItem label="Hair Type" value={user_profile?.hair_type} />
        <DetailItem label="Blood Group" value={user_profile?.blood_group} />
      </div>

      <h3 className="font-semibold mb-3">Education & Profession</h3>
      <div className="space-y-4 mb-6">
        <DetailItem label="Education" value={groom_bride_info?.education} />
        <DetailItem label="College" value={groom_bride_info?.college_name} />
        <DetailItem label="Profession" value={groom_bride_info?.occupation} />
        <DetailItem label="Company" value={groom_bride_info?.company_name} />
        <DetailItem label="Income" value={groom_bride_info?.income} />
        <DetailItem label="Experience" value={`${groom_bride_info?.experience} years`} />
      </div>

      <h3 className="font-semibold mb-3">Family Background</h3>
      <div className="space-y-4 mb-6">
        <DetailItem label="Financial Status" value={family_info?.family_status} />
        <DetailItem label="Family Type" value={family_info?.family_type} />
        <DetailItem label="Home Type" value={family_info?.home_type} />
        <DetailItem label="Father's Name" value={family_info?.father_name} />
        <DetailItem label="Father's Occupation" value={family_info?.father_occupation} />
        <DetailItem label="Mother's Name" value={family_info?.mother_name} />
        <DetailItem label="Mother's Occupation" value={family_info?.mother_occupation} />
        <DetailItem label="Number of Brothers" value={family_info?.number_of_brothers} />
        <DetailItem label="Married Brothers" value={family_info?.married_brothers} />
        <DetailItem label="Number of Sisters" value={family_info?.number_of_sisters} />
        <DetailItem label="Married Sisters" value={family_info?.married_sisters} />
      </div>

      <h3 className="font-semibold mb-3">Location</h3>
      <div className="space-y-4 mb-6">
        <DetailItem label="Current City" value={groom_bride_info?.present_city} />
        <DetailItem label="State" value={groom_bride_info?.present_state} />
        <DetailItem label="Country" value={groom_bride_info?.present_country} />
        <DetailItem label="Address" value={groom_bride_info?.addres} />
      </div>

    </>
  );
}

const DetailItem = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 bg-gray50 shadow-md rounded-lg">
    <span className="text-gray-600">{label}</span>
    <span>{value || "N/A"}</span>
  </div>
);

export default ProfileDetailOther;
