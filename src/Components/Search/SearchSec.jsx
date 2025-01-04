import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import FilterOption from "./FilterOption";
import SearchFilter from "./SearchFilter";


function SearchSec() {
  const [filters, setFilters] = useState({
    weight: [30, 150],
    age: [18, 21],
    height: [137, 217],
  });

  const [activeFilter, setActiveFilter] = useState("filter");
  const [activeLocation, setActiveLocation] = useState("location");

  return (

    <div className="relative h-full overflow-scroll bg-gray-100">
      <div className="m-5 hidden md:block">
        <Link to="/">
          <button className="bg-button flex items-center gap-3 p-2 px-5 mb-4 rounded-xl text-white">
            <FaLeftLong />
            Back
          </button>
        </Link>
      </div>

      <div className="w-full container mx-auto p-4 bg-white shadow-lg rounded-lg mb-16">
        <div className="flex gap-3 mb-4">
          <button
            className={`px-6 py-2 rounded-xl text-white ${
              activeFilter === "filter" ? "bg-button" : "bg-gray"
            }`}
            onClick={() => setActiveFilter("filter")}
          >
            Filter
          </button>
          <button
            className={`px-6 py-2 rounded-xl text-white ${
              activeFilter === "search" ? "bg-button" : "bg-gray"
            }`}
            onClick={() => setActiveFilter("search")}
          >
            ID Search
          </button>
        </div>

        <FilterOption activeFilter={activeFilter} filters={filters} activeLocation={activeLocation} setActiveLocation={setActiveLocation}/>

        <SearchFilter activeFilter={activeFilter}/>

        <button className="left-0 w-full right-0 bg-button text-white py-4 rounded-xl mt-3 flex items-center justify-center gap-2 shadow-md">
          <CgSearch className="w-5 h-5" />
          Search
        </button>
      </div>
    </div>

  );
}



export default SearchSec;
