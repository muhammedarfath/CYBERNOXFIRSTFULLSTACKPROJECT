import React, { useState } from "react";
import RegisterFooter from "../Components/Footer/RegisterFooter.jsx";
import RegisterHead from "../Components/Header/RegisterHeader/RegisterHead.jsx";
import BasicDetailSec from "../Components/Section/BasicDetailsSec/BasicDetailSec.jsx";
import OurServicesCard from "../Components/Section/BasicDetailsSec/OurServicesCard";
function BasicDetails() {
  return (
    <>
      <div>
        <RegisterHead />
      </div>
      <div className="md:h-full lg:h-screen w-full bg-gradient-to-b from-primary">
        <div className="flex lg:flex-row flex-col gap-4 justify-center items-center p-6 md:p-28">
          <BasicDetailSec />
          <OurServicesCard/>
        </div>
        <div>
          <RegisterFooter />
        </div>
      </div>
    </>
  );
}

export default BasicDetails;
