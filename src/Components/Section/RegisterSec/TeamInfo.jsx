import React from "react";
import team from "../../../assets/Customer Service Concept African Woman.png";

function TeamInfo() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full mt-9 text-white bg-primary p-5">
      <div className="w-full flex justify-center mb-6 md:mb-0">
        <img
          src={team}
          alt="Our Team"
          className="w-64 h-auto md:w-96"
        />
      </div>

      <div className="w-full md:w-[100rem] text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Our Team is Here for You, 24/7
        </h1>
        <p className="mt-4 text-base md:text-lg leading-relaxed">
          Our dedicated team is available round the clock to provide you with
          the best support and assistance. Whether you need help during
          registration, connecting with matches, or resolving any issues, we're
          just a message away. Trust us to make your experience smooth and
          enjoyable.
        </p>
      </div>
    </div>
  );
}

export default TeamInfo;
