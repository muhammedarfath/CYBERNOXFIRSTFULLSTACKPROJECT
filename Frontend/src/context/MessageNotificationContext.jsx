// NotificationContext.js
import React, { createContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import Logo from "../assets/logo PNG M.png";

export const MessageNotificationContext = createContext();

export const MessageNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);




  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
    showToast(notification);
  };


  const showToast = (notification) => {
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
                className="h-16 w-16 rounded-full scale-150"
                src={notification.user?.profile_picture || Logo}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-gray-900 font-semibold">
                {notification.user?.name || "You've receicved a new message"}
              </p>
              <p className="mt-1 text-sm text-gray-500 ">
                {notification.message || "You have a new interest notification!"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex ">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-white rounded-none p-4 flex items-center justify-center text-sm font-medium text-indigo-600 focus:outline-none focus:ring-2 focus:ring-button"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <MessageNotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </MessageNotificationContext.Provider>
  );
};