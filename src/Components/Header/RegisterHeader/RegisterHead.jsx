import React, { useState } from "react";
import RegisterNav from "./RegisterNav";

function RegisterHead() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white">
      <div className="flex w-full justify-between p-3">
        <RegisterNav />
      </div>
    </header>
  );
}

export default RegisterHead;
