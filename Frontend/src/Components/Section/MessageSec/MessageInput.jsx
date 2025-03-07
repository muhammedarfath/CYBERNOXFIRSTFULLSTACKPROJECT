import React, { useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";

function MessageInput({ message, setMessage, handleSend }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false); 
  };

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div className="relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
        >
          😀
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            className="flex w-full border border-gray rounded-xl focus:outline-none focus:border-gray pl-4 h-10"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
