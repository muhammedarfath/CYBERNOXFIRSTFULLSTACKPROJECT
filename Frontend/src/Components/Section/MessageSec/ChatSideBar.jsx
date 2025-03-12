import { useState, useEffect } from "react";
import { MdBlock, MdReport } from "react-icons/md";
import { backendUrl } from "../../../Constants/Constants";
import userphoto from "../../../assets/default.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../axios";
import requests from "../../../lib/urls";

function ChatSideBar({ messageUser, isUserOnline, isScrolled, buttonBlock, GetMessage }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768 ? isScrolled : false);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isScrolled]);

  const profilePicture = messageUser?.user_profile?.user?.profile_picture
    ? `${backendUrl}${messageUser.user_profile.user.profile_picture}`
    : userphoto;

  const handleProfileClick = () => navigate("/profiledetails", { state: { slide: messageUser } });

  const handleAction = async (actionType) => {
    const actionText = actionType === "block" ? "block/report" : "Unblock";
    const confirmText = actionType === "block" ? "Yes, block/report!" : "Yes, Unblock";
    const apiEndpoint = actionType === "block" ? requests.BlockUser : requests.UnBlockUser;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionText} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.post(apiEndpoint, { userId: messageUser.user_profile.user.id });
        if (response.data.status === "success") {
          GetMessage();
          Swal.fire(actionText, `The user has been ${actionText}ed.`, "success");
        }
      } catch {
        Swal.fire("Error!", `There was an issue ${actionText}ing the user.`, "error");
      }
    }
  };

  return (
    <div className={`flex flex-col md:py-8 md:pl-6 md:pr-2 md:w-64 w-full bg-white transition-all ${collapsed ? "max-h-24 overflow-hidden" : "max-h-[1000px]"}`}>
      <div className="flex justify-between items-center h-12">
        <div className="flex items-center">
          <div className="rounded-2xl h-10 w-10 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">QuickChat</div>
        </div>

        <button onClick={() => setCollapsed(!collapsed)} className="md:hidden text-gray-500 p-2">
          {collapsed ? "▼" : "▲"}
        </button>
      </div>

      <div className={`flex text-white flex-col items-center cursor-pointer bg-primary mt-4 py-6 px-4 rounded-lg ${collapsed ? "hidden md:flex" : "flex"}`} onClick={handleProfileClick}>
        <img src={profilePicture} alt="Avatar" className="h-20 w-20 rounded-full object-cover" />
        <div className="text-sm font-semibold mt-2">{messageUser?.user_profile?.name}</div>
        <div className="text-xs">{messageUser?.groom_bride_info?.occupation}</div>
        {isUserOnline && <div className="text-xs mt-3">🟢 Active</div>}
      </div>

      <div className={`mt-4 ${collapsed ? "hidden md:block" : "block"}`}>
        <button className="flex items-center gap-2 bg-button text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={() => handleAction(buttonBlock ? "unblock" : "block")}> 
          {buttonBlock ? <MdBlock className="w-5 h-5" /> : <MdReport className="w-5 h-5" />} 
          {buttonBlock ? "Unblock" : "Block / Report"}
        </button>
      </div>
    </div>
  );
}

export default ChatSideBar;
