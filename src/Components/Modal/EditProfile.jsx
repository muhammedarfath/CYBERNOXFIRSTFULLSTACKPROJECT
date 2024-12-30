import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Button,
  } from "@nextui-org/react";
  import { useState } from "react";
  
  export default function EditProfile({ onOpenChange, isOpen }) {
    const [profileDetails, setProfileDetails] = useState({
      name: "Muhammed Arfath",
      profileId: "WT3677639",
      age: "21 Yrs",
      gender: "Male",
      maritalStatus: "Never Married",
      profileFor: "My Self",
      willingToRelocate: "",
      marriagePlan: "",
      healthIssues: "No",
      ethnicGroup: "",
      motherTongue: "",
      languagesSpoken: "",
    });
  
    const handleChange = (e) => {
      setProfileDetails({
        ...profileDetails,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(profileDetails);
      onOpenChange(false); 
    };
  
    return (
      <Modal
        backdrop="blur"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/40 backdrop-blur-md",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-white shadow-xl rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
              <ModalBody className="max-h-[500px] overflow-y-auto p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Name</label>
                    <Input
                      name="name"
                      value={profileDetails.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Profile ID</label>
                    <Input
                      name="profileId"
                      value={profileDetails.profileId}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Age</label>
                    <Input
                      name="age"
                      value={profileDetails.age}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Gender</label>
                    <Input
                      name="gender"
                      value={profileDetails.gender}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Marital Status</label>
                    <Input
                      name="maritalStatus"
                      value={profileDetails.maritalStatus}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Creating Profile for</label>
                    <Input
                      name="profileFor"
                      value={profileDetails.profileFor}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Willing to Relocate</label>
                    <Input
                      name="willingToRelocate"
                      value={profileDetails.willingToRelocate}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Marriage Plan</label>
                    <Input
                      name="marriagePlan"
                      value={profileDetails.marriagePlan}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Any Health / Disability Issues?</label>
                    <Input
                      name="healthIssues"
                      value={profileDetails.healthIssues}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Ethnic Group</label>
                    <Input
                      name="ethnicGroup"
                      value={profileDetails.ethnicGroup}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Mother Tongue</label>
                    <Input
                      name="motherTongue"
                      value={profileDetails.motherTongue}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-700 font-medium">Languages Spoken</label>
                    <Input
                      name="languagesSpoken"
                      value={profileDetails.languagesSpoken}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-primary2"
                    />
                  </div>
  
                  <Button type="submit" className="mt-4 w-full bg-button text-white">
                    Save
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
  