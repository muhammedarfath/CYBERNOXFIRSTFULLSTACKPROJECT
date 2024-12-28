import React from "react";
import { TbEdit } from "react-icons/tb";

function PartnerExpectation() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-lg shadow-md p-5">
      <div>
        <div className="flex gap-3">
          <h1 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Partner Expectation
          </h1>
        </div>
        <ul className="space-y-2">
          <li>
            <span className="font-bold">Marital Status:</span> Never Married
          </li>
          <li>
            <span className="font-bold">Caste:</span> Not filled / Didn't matter
          </li>
          <li>
            <span className="font-bold">Age:</span> 22 to 25
          </li>
          <li>
            <span className="font-bold">Height:</span> 4ft 8in to 6ft
          </li>
          <li>
            <span className="font-bold">Education:</span> Not filled / Didn't
            matter
          </li>
          <li>
            <span className="font-bold">Occupation:</span> Not filled / Didn't
            matter
          </li>
          <li>
            <span className="font-bold">Mother Tongue:</span> Not filled /
            Didn't matter
          </li>
          <li>
            <span className="font-bold">Annual Income:</span> No Income
          </li>
          <li>
            <span className="font-bold">Complexion:</span> Not filled / Didn't
            matter
          </li>
          <li>
            <span className="font-bold">Sect:</span> Sunni
          </li>
          <li>
            <span className="font-bold">City:</span> Not filled / Didn't matter
          </li>
          <li>
            <span className="font-bold">State:</span> Kerala
          </li>
          <li>
            <span className="font-bold">Country:</span> India
          </li>
        </ul>
      </div>

      <div className="bg-button p-3 rounded-2xl cursor-pointer hover:bg-[#FFB9C3]">
        <TbEdit className="text-white text-2xl" />
      </div>
    </div>
  );
}

export default PartnerExpectation;
