import React, { useState, useEffect } from "react";
import { Carousel, Card } from "../../../Components/ui/apple-cards-carousel";
import { MdFilterList } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FloatingDockDemo } from "../../Layout/FloatingDockDemo";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { useNotification } from "../../../context/NotificationProvider";
import CarouselSkeleton from "../../Loading/CarouselSkeleton";

export function MessageSec() {
  const [filter, setFilter] = useState("All Messages");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`${requests.Messages}`)
      .then((response) => {

        const { users, latest_messages, profiles } = response.data;

        const formattedData = latest_messages.map((msg) => {
        
          const user = users.find(
            (u) => u.id === msg.sender.id || u.id === msg.receiver.id
          );

          const profile = profiles.find((p) => p.user === user?.id);

          return {
            id: user?.id,
            title: user?.unique_id,
            src: user?.profile_picture || "/default-avatar.png",
            content: <p>{msg.content}</p>,
            unread: !msg.is_read,
            name: profile?.name || "Unknown",
            timestamp: new Date(msg.timestamp),
          };
        });

        const sortedData = formattedData.sort(
          (a, b) => b.timestamp - a.timestamp
        );

        setMessages(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load messages");
        setLoading(false);
      });

    axiosInstance
      .post(`${requests.readNotification}`)
      .then((response) => {
        console.log("All message notifications marked as read");
      })
      .catch((err) => {
        console.error("Failed to mark notifications as read", err);
      });
  }, []);

  const filteredData =
    filter === "Unread Messages"
      ? messages.filter((msg) => msg.unread)
      : messages;

  const cards = filteredData.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 w-full container mx-auto p-4 mt-5">
        <div className="flex justify-between items-center gap-3 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-purple-800">
              {filter === "Unread Messages"
                ? "Unread Messages"
                : "All Messages"}
            </h1>
            <p className="text-gray-600 text-sm">
              View and manage all your messages.
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark"
            >
              <MdFilterList className="text-2xl" />
              Filter
            </button>
            {showFilterOptions && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-md rounded-md p-2 z-50 animate-fade-in">
                <ul className="flex flex-col">
                  <li
                    className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                      filter === "All Messages" ? "bg-gray-200 font-bold" : ""
                    }`}
                    onClick={() => {
                      setFilter("All Messages");
                      setShowFilterOptions(false);
                    }}
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-xl ${
                        filter === "All Messages"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    All Messages
                  </li>
                  <li
                    className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                      filter === "Unread Messages"
                        ? "bg-gray-200 font-bold"
                        : ""
                    }`}
                    onClick={() => {
                      setFilter("Unread Messages");
                      setShowFilterOptions(false);
                    }}
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-xl ${
                        filter === "Unread Messages"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    />
                    Unread Messages
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <CarouselSkeleton/>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No messages available.</p>
      ) : (
        <Carousel items={cards} />
      )}

      <div className="slider-controler">
        <FloatingDockDemo />
      </div>
    </div>
  );
}
