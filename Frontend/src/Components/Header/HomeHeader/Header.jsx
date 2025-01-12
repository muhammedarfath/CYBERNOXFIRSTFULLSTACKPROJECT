import React, { useState } from "react";
import HomeFixedIcons from "./HomeFixedIcons";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <header>
        <div className="bg-white shadow-sm transition-all duration-500">
          <Navbar toggleMenu={toggleMenu} />
          <MobileMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        </div>
        <HomeFixedIcons />
      </header>
    </>
  );
}

export default Header;
