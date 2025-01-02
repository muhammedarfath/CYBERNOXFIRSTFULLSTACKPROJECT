import React, { useState, useRef } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { CiMedal, CiUser, CiHeart, CiChat1 } from "react-icons/ci";

export function FloatingDockDemo() {
  const [activeItem, setActiveItem] = useState("MATRYMONY"); // Default active item

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const links = [
    {
      title: "Profile",
      icon: <CiUser className="h-full w-full" />,
      href: "/profile",
    },
    {
      title: "Best Matches",
      icon: <CiMedal className="h-full w-full" />,
      href: "/bestmatch",
    },
    {
      title: "MATRYMONY",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "/",
    },
    {
      title: "Like",
      icon: <CiHeart className="h-full w-full" />,
      href: "/interest",
    },
    {
      title: "Message",
      icon: <CiChat1 className="h-full w-full" />,
      href: "/message",
    },
  ];

  return (
    <div className="hidden md:block z-50 justify-center items-end h-16">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
        activeItem={activeItem}
        setActiveItem={handleClick}
      />
    </div>
  );
}

