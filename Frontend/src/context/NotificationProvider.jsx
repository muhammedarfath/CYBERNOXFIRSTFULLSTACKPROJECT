import { createContext, useState, useEffect, useRef, useContext } from "react";
import axiosInstance from "../axios";
import requests from "../lib/urls";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const accessToken = useSelector((state) => state.auth.token);
  const ws = useRef(null);
  const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

  const fetchUnreadNotifications = async () => {
    try {
      console.log("Fetching unread notifications..."); // Debugging log
      const response = await axiosInstance.get(requests.UnreadNotification);
      console.log("API Response:", response.data); // Log API response
  
      if (response.data && typeof response.data.unread_count === "number") {
        setUnreadCount(response.data.unread_count);
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      setUnreadCount(0);
    }
  };

  const initializeWebSocket = () => {
    if (!accessToken) return;
    
    if (ws.current) {
      ws.current.close();
    }

    const socketUrl = `${socketBaseUrl}?token=${accessToken}`;
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.notification) {
        setUnreadCount((prev) => prev + 1);

        if (data.notification) {    
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
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
                        {data.notification.user || "New User"}{" "}
                        {/* Name from data */}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {data.notification.message ||
                          "You have a new notification!"}
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
      }

      if (data.option === "fetch_unread_notification" && Array.isArray(data.notifications)) {
        setUnreadCount(data.notifications.length);
      }
    };

    ws.current.onclose = () => {
      console.warn("WebSocket closed. Reconnecting...");
      setTimeout(initializeWebSocket, 3000);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current.close();
    };
  };

  useEffect(() => {
    if (!accessToken) return; 
  
    fetchUnreadNotifications();
    initializeWebSocket();
  
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [accessToken]);

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
