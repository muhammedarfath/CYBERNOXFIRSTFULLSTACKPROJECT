import { createContext, useState, useEffect, useRef, useContext } from "react";
import axiosInstance from "../axios";
import requests from "../lib/urls";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Logo from "../assets/logo PNG M.png";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [interestUnreadCount, setInterestUnreadCount] = useState(0); // For interest notifications
  const [messageUnreadCount, setMessageUnreadCount] = useState(0); // For message notifications
  const [receivedNotifications, receivedSetNotifications] = useState([]);
  const [sentNotifications, sentSetNotifications] = useState([]);
  const [hasActiveSubscription, hasSetActiveSubscription] = useState(false);

  const accessToken = useSelector((state) => state.auth.token);
  const ws = useRef(null);

  const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

  const fetchUnreadNotifications = async () => {
    try {
      const response = await axiosInstance.get(requests.UnreadNotification);
      if (response.data) {
        // Update counts
        setUnreadCount(response.data.unread_count);
        setInterestUnreadCount(response.data.interest_unread_count);
        setMessageUnreadCount(response.data.message_unread_count);

        // Update notifications
        receivedSetNotifications(response.data.received_notifications || []);
        sentSetNotifications(response.data.sent_notifications || []);
        hasSetActiveSubscription(response.data.has_active_subscription);
      } else {
        // Reset counts and notifications
        setUnreadCount(0);
        setInterestUnreadCount(0);
        setMessageUnreadCount(0);
        receivedSetNotifications([]);
        sentSetNotifications([]);
        hasSetActiveSubscription(false);
      }
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      setUnreadCount(0);
      setInterestUnreadCount(0);
      setMessageUnreadCount(0);
      receivedSetNotifications([]);
      sentSetNotifications([]);
      hasSetActiveSubscription(false);
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
        setInterestUnreadCount((prev) => prev + 1);
        // Show toast for interest notification
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
                    className="h-16 w-16 rounded-full scale-150"
                    src={data.notification.user?.profile_picture || Logo}
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
                      "You have a new interest notification!"}
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

        // Update unread count
        setUnreadCount((prev) => prev + 1);

        // Add notification to the list
        receivedSetNotifications((prev) => [data.notification, ...prev]);

        // Fetch updated notifications
        fetchUnreadNotifications();
      }

      if (
        data.option === "fetch_unread_notification" &&
        Array.isArray(data.notifications)
      ) {
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
    <NotificationContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        interestUnreadCount,
        messageUnreadCount,
        receivedNotifications,
        receivedSetNotifications,
        sentNotifications,
        sentSetNotifications,
        hasActiveSubscription,
        fetchUnreadNotifications,
        setMessageUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
