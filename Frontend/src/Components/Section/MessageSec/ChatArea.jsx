import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";
import { useSelector } from "react-redux";
import Loader from "../../Loading/Loader";
import ChatSideBar from "./ChatSideBar";
import MessageInput from "./MessageInput";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { backendUrl } from "../../../Constants/Constants";

export default function ChatArea() {
  const { name } = useParams();
  const location = useLocation();
  const chatuserId = location.state?.userId;
  const messageEndRef = useRef(null);
  const socketRef = useRef(null);
  const [messageUser, setMessageUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const {
    email,
    token: accessToken,
    userId,
  } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  let sender = userId;
  let receiver = chatuserId;

// Scroll to the bottom when messages update or when a new message is sent
useEffect(() => {
  if (messageEndRef.current) {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay to ensure DOM is updated
  }
}, [messages]);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`${requests.getMessageUser}`, {
          params: { user_id: chatuserId },
        });
        setMessageUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chatuserId) fetchUser();
  }, [chatuserId]);

  useEffect(() => {
    GetMessage();
  }, [sender, receiver]);

  const GetMessage = async () => {
    await axiosInstance
      .get(`${requests.getMessage}${sender}/${receiver}/`)
      .then((response) => {
        setMessages(response.data);
        console.log("message is the ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Cannot be empty");
      return;
    }
  
    const messageValue = message;
    if (chatuser.readyState === W3CWebSocket.OPEN) {
      chatuser.send(JSON.stringify({ text: messageValue, sender: sender }));
      setMessage("");
  
      // Add the message immediately to the chat for better UX
      const newMessage = {
        id: Date.now(), // Temporary ID for new messages
        message: messageValue,
        sender: { id: userId, profile_picture: messageUser?.profile_picture },
        receiver: { id: receiver, profile_picture: messageUser?.profile_picture },
        date: new Date().toISOString(),
        is_read: false,
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      console.error("WebSocket not open yet. Message not sent.");
    }
  };
  

  const chatuser = new W3CWebSocket(
    `ws://localhost:8000/ws/chat/${sender}_${receiver}/?token=${accessToken}`
  );

  useEffect(() => {
    chatuser.onopen = () => {
      console.log("websocket chatuser connected");
    };

    chatuser.onerror = (error) => {
      console.error("WebSocket error:", error.message);
      console.error("WebSocket error:", error.message);
    };
    chatuser.onclose = () => {
      console.log("WebSocket chatuser disconnected");
    };
    return () => {
      chatuser.close();
    };
  }, [sender, receiver]);

  useEffect(() => {
    chatuser.onmessage = (event) => {
      try {
        const dataFromServer = JSON.parse(event.data);
        console.log(dataFromServer, "what about this");
        if (dataFromServer) {
          const newMessage = {
            id: dataFromServer.messages.id,
            message: dataFromServer.message,
            sender: {
              id: dataFromServer.messages.sender.id,
              profile_picture: dataFromServer.messages.sender.profile_picture,
            },
            receiver: {
              id: dataFromServer.messages.receiver.id,
              profile_picture: dataFromServer.messages.receiver.profile_picture,
            },
            date: dataFromServer.messages.timestamp,
            is_read: dataFromServer.messages.is_read,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      } catch (error) {
        console.log("the error is the", error);
      }
    };
  }, [sender, receiver]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  console.log(messages, "all messages");

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
                {messages &&
                  messages.map((msg, index) => (
                    <div key={index} className="grid grid-cols-12 gap-y-2">
                      {msg.sender.id === userId ? (
                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                              <img
                                src={
                                  msg.sender.id === userId
                                    ? msg.sender?.profile_picture
                                    : msg.receiver.profile_picture
                                }
                                alt="User"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              {typeof msg.message === "object" ? (
                                <div>{msg.message.message}</div>
                              ) : (
                                <div>{msg.message}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                              <img
                                src={
                                  msg.receiver.id === receiver
                                    ? msg.receiver?.profile_picture
                                    : msg.sender.profile_picture
                                }
                                alt="User"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="relative mr-3 text-sm bg-lightgreen py-2 px-4 shadow rounded-xl">
                              {typeof msg.message === "object" ? (
                                <div>{msg.message.message}</div>
                              ) : (
                                <div>{msg.message}</div>
                              )}{" "}
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
