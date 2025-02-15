import React from "react";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
}

export default Loader;
