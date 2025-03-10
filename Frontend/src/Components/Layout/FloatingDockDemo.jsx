import React, { useState } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { CiMedal, CiUser, CiHeart, CiChat1 } from "react-icons/ci";
import { useNotification } from "../../context/NotificationProvider";
import Logo from "../../assets/logo.png";

export function FloatingDockDemo() {
  const { interestUnreadCount, messageUnreadCount } = useNotification(); 
  const [activeItem, setActiveItem] = useState("MATRYMONY");

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
          src={Logo}
          alt="Aceternity Logo"
          className="scale-[3.5]"
        />
      ),
      href: "/",
    },
    {
      title: "Like",
      icon: (
        <>
          {interestUnreadCount > 0 && ( // Use interestUnreadCount here
            <span className="absolute top-0 right-0 bg-button text-white text-xs rounded-full px-2">
              {interestUnreadCount}
            </span>
          )}
          <div className="relative">
            <CiHeart className="h-full w-full" />
          </div>
        </>
      ),
      href: "/interest",
    },
    {
      title: "Message",
      icon: (
        <>
          {messageUnreadCount > 0 && ( 
            <span className="absolute top-0 right-0 bg-button text-white text-xs rounded-full px-2">
              {messageUnreadCount}
            </span>
          )}
          <div className="relative">
            <CiChat1 className="h-full w-full" />
          </div>
        </>
      ),
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