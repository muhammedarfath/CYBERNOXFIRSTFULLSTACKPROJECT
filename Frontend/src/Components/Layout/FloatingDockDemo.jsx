import React, { useState, useEffect, useRef } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { CiMedal, CiUser, CiHeart, CiChat1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

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

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      // Request unread notifications once the WebSocket connection is established
      ws.current.send(
        JSON.stringify({
          option: "fetch_unread_notification",
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔥 WebSocket Message Received:", data);

      if (data.notification) {
        setUnreadCount((prev) => prev + 1);

        // Show custom toast notification
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {data.notification.user || "New User"} {/* Name from data */}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {data.notification.message || "You have a new notification!"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }

      // Handling fetch_unread_notification response
      if (data.option === "fetch_unread_notification" && data.notifications) {
        setUnreadCount(data.notifications.length); // Set the unread count
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
