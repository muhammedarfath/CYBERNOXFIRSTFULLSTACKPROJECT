import React, { useState } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { CiMedal, CiUser, CiHeart, CiChat1 } from "react-icons/ci";
import { useNotification } from "../../context/NotificationProvider";

export function FloatingDockDemo() {
  const { unreadCount } = useNotification();
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
      icon: (
        <>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-button text-white text-xs rounded-full px-2">
              {unreadCount}
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
