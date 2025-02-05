import React, { useState, useEffect, useRef } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { CiMedal, CiUser, CiHeart, CiChat1 } from "react-icons/ci";
import { useSelector } from "react-redux";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

export function FloatingDockDemo() {
  const [activeItem, setActiveItem] = useState("MATRYMONY");
  const [unreadCount, setUnreadCount] = useState(0);
  const accessToken = useSelector((state) => state.auth.token);
  const ws = useRef(null);

  useEffect(() => {
    if (!accessToken) return;
  
    const socketUrl = `${socketBaseUrl}?token=${accessToken}`;
    ws.current = new WebSocket(socketUrl);
  
    ws.current.onopen = () => console.log("WebSocket Connected");
  
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔥 WebSocket Message Received:", data);
  
      if (data.notification) {
        setUnreadCount((prev) => prev + 1);
      }
    };
  
    ws.current.onclose = () => console.log("WebSocket Disconnected");
  
    return () => ws.current?.close();
  }, [accessToken]);
  




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
        <div className="relative">
          <CiHeart className="h-full w-full" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-button text-white text-xs rounded-full px-2">
              {unreadCount}
            </span>
          )}
        </div>
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
