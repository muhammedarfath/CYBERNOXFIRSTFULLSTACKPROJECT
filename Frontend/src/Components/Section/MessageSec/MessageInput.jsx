import React from "react";
import { AiOutlineAudio } from "react-icons/ai";

function MessageInput({message,setMessage,handleSend}) {
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div>
        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586A2 2 0 1015.172 7z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 20h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border border-gray rounded-xl focus:outline-none focus:border-gray pl-4 h-10"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Capture user input
            onKeyPress={(e) => e.key === "Enter" && handleSend()} // Send on Enter key
          />
        </div>
      </div>
      <div className="flex gap-4 ml-4">
        <div>
          <button className="flex items-center justify-center text-primary hover:text-black">
            <AiOutlineAudio className="w-6 h-6" />
          </button>
        </div>
        <button
          onClick={handleSend}
          className="flex items-center justify-center bg-button hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
