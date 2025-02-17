import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { useSelector } from "react-redux";
import Loader from "../../Loading/Loader";
import ChatSideBar from "./ChatSideBar";
import MessageInput from "./MessageInput";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/chat/";

export default function ChatArea() {
  const { name } = useParams();
  const location = useLocation();
  const userId = location.state?.userId;
  const messageEndRef = useRef(null);
  const socketRef = useRef(null);
  const [messageUser, setMessageUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const { email, token: accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`${requests.getMessageUser}`, {
          params: { user_id: userId },
        });
        setMessageUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);


  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const connectWebSocket = () => {
      const roomName = encodeURIComponent(name);
      const socketUrl = `${socketBaseUrl}${roomName}/?token=${accessToken}`;
      const ws = new WebSocket(socketUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket Connected");
        ws.send(JSON.stringify({ option: "fetch_messages", userId }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("New WebSocket message received:", data);

        if (
          data.option === "new_messages" ||
          data.option === "fetch_messages"
        ) {
          if (Array.isArray(data.messages)) {
            setNewMessage((prev) => [...prev, ...data.messages]);
          } else {
            console.error("Error: messages is not an array", data);
          }
        }
        setLoading(false);
      };

      ws.onclose = (event) => {
        console.log("WebSocket Closed:", event.code, event.reason);
        setTimeout(() => connectWebSocket(), 3000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      return ws;
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [name, accessToken]);


  const handleSend = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message.");
      return;
    }

    if (!message.trim()) {
      console.error("Message is empty. Cannot send.");
      return;
    }

    const newMsg = {
      author: messageUser.email,
      sender: email,
      content: message,
    };

    setNewMessage((prev) => [...prev, newMsg]);

    socketRef.current.send(
      JSON.stringify({ option: "new_messages", userId, message })
    );

    setMessage("");
  };


  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="flex h-full text-black">
      <div className="flex md:flex-row flex-col gap-4 md:gap-0 h-full w-full overflow-x-hidden">
        <ChatSideBar messageUser={messageUser} />

        <div className="flex flex-col flex-auto h-auto">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-2xl">
            <h2 className="text-lg font-semibold">Chat</h2>
          </div>
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {newMessage.map((msg, index) => (
                  <div key={index} className="grid grid-cols-12 gap-y-2">
                    {msg.sender === email ? (
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white flex-shrink-0">
                            {msg.sender[0].toUpperCase()}
                          </div>
                          <div className="relative mr-3 text-sm bg-lightgreen py-2 px-4 shadow rounded-xl">
                            <div>{msg.content}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-black flex-shrink-0">
                          {msg.sender[0].toUpperCase()}
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{msg?.content}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <MessageInput
              message={message}
              setMessage={setMessage}
              handleSend={handleSend}
              
            />
          </div>

          <div ref={messageEndRef}></div>
        </div>
      </div>
    </div>
  );
}
