"use client"

import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import axiosInstance from "../../../axios"
import requests from "../../../lib/urls"
import { useSelector } from "react-redux"
import Loader from "../../Loading/Loader"
import ChatSideBar from "./ChatSideBar"
import MessageInput from "./MessageInput"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { toast } from "react-hot-toast"

export default function ChatArea() {
  const [isUserOnline, setIsUserOnline] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const chatuserId = location.state?.userId
  const messageEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const socketRef = useRef(null)
  const [messageUser, setMessageUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const { email, token: accessToken, userId } = useSelector((state) => state.auth)
  const [messages, setMessages] = useState([])

  const sender = userId
  const receiver = chatuserId

  // Handle scroll events to detect when user scrolls the chat
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop } = chatContainerRef.current
        setIsScrolled(scrollTop > 50)
      }
    }

    const container = chatContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Auto-scroll to the bottom of the chat when new messages are added
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch the user details for the chat
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(requests.getMessageUser, {
          params: { user_id: chatuserId },
        })
        setMessageUser(response.data)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    if (chatuserId) fetchUser()
  }, [chatuserId])

  // Fetch messages between sender and receiver
  useEffect(() => {
    GetMessage()
  }, [sender, receiver])

  const GetMessage = async () => {
    await axiosInstance
      .get(`${requests.getMessage}${sender}/${receiver}/`)
      .then((response) => {
        setMessages(response.data)
        // Scroll to bottom after messages are loaded
        setTimeout(scrollToBottom, 100)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // WebSocket connections
  const chatuser = new W3CWebSocket(`ws://localhost:8000/ws/chat/${sender}_${receiver}/?token=${accessToken}`)

  // Handle WebSocket connections and messages
  useEffect(() => {
    chatuser.onopen = () => {
      console.log("WebSocket chatuser connected")
    }

    chatuser.onerror = (error) => {
      console.error("WebSocket error:", error.message)
    }

    chatuser.onclose = () => {
      console.log("WebSocket chatuser disconnected")
    }

    return () => {
      chatuser.close()
    }
  }, [sender, receiver])

  useEffect(() => {
    chatuser.onmessage = (event) => {
      try {
        const dataFromServer = JSON.parse(event.data)

        if (dataFromServer.type === "status_update") {
          if (Number.parseInt(dataFromServer.user_id) === chatuserId) {
            setIsUserOnline(dataFromServer.status === "online")
          }
        } else if (dataFromServer.messages) {
          const newMessage = {
            id: dataFromServer.messages.id,
            message: dataFromServer.message,
            sender: { id: dataFromServer.messages.sender.id },
            receiver: { id: dataFromServer.messages.receiver.id },
            date: dataFromServer.messages.date,
            is_read: dataFromServer.messages.is_read,
          }
          setMessages((prevMessages) => [...prevMessages, newMessage])
          GetMessage()
          // Ensure we scroll to bottom when new message arrives
          setTimeout(scrollToBottom, 100)
        }
      } catch (error) {
        console.log("Error handling WebSocket message:", error)
      }
    }
  }, [sender, receiver, chatuserId])

  // Handle sending messages
  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim()) {
      toast.error("Cannot be empty")
      return
    }

    const messageValue = message
    if (chatuser.readyState === W3CWebSocket.OPEN) {
      chatuser.send(
        JSON.stringify({
          text: messageValue,
          sender: sender,
        }),
      )
      setMessage("")
      // Scroll to bottom immediately after sending
      setTimeout(scrollToBottom, 50)
    } else {
      console.error("WebSocket not open yet. Message not sent.")
    }
  }

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    )

  return (
    <div className="flex h-full text-black">
      <div className="flex md:flex-row flex-col gap-4 md:gap-0 h-full w-full overflow-x-hidden">
        <ChatSideBar messageUser={messageUser} isUserOnline={isUserOnline} isScrolled={isScrolled} />

        <div className="flex flex-col flex-auto h-auto">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-2xl">
            <h2 className="text-lg font-semibold">Chat with {messageUser?.name}</h2>
            <div className="md:hidden flex items-center">
              {isUserOnline && (
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-[#5BE65C] rounded-full mr-1"></div>
                  <span className="text-xs">Active</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray h-full p-4">
            <div ref={chatContainerRef} className="flex flex-col h-full overflow-y-auto mb-4">
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
                                  msg.sender.id === userId ? msg.sender?.profile_picture : msg.receiver.profile_picture
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
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                <div ref={messageEndRef}></div>
              </div>
            </div>

            <MessageInput message={message} setMessage={setMessage} handleSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  )
}

