import React from "react";
import { backendUrl } from "../../../Constants/Constants";
import { MdReport } from "react-icons/md";

function ChatSideBar({messageUser}) {
  return (
    <div className="flex flex-col md:py-8 md:pl-6 md:pr-2 md:w-64 w-full bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="flex items-center justify-center rounded-2xl text-black h-10 w-10">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>

        <div className="ml-2 font-bold text-2xl">QuickChat</div>
      </div>

      <div className="flex flex-col text-white items-center bg-primary mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full overflow-hidden">
          <img
            src={`${backendUrl}${messageUser?.profile_picture}`}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-sm font-semibold mt-2">{name}</div>
        <div className="text-xs">Lead UI/UX Designer</div>
        <div className="flex flex-row items-center mt-3">
          <div className="flex flex-col justify-center h-4 w-8 rounded-full">
            <div className="h-3 w-3 bg-[#5BE65C] rounded-full self-end mr-1"></div>
          </div>
          <div className="leading-none ml-1 text-xs">Active</div>
        </div>
      </div>

      <div className="mt-4">
        <button className="flex items-center gap-2 bg-button text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none">
          <MdReport className="w-5 h-5" />
          Block / Report
        </button>
      </div>
    </div>
  );
}

export default ChatSideBar;
