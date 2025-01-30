import React, { useContext, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { RiEmojiStickerLine } from "react-icons/ri";
import { TbPhotoSquareRounded } from "react-icons/tb";
import axiosInstance from "../../axios";
import requests from "../../lib/urls";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";

function PostForm({ setIsModalOpen, selectedImage, setSelectedImage }) {
  const { fetchDetails } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (!content && !selectedImage) {
      alert("Content or image is required to create a post.");
      return;
    }
  
    const formData = new FormData();
    formData.append("content", content);
  
    if (!userId) {
      alert("User ID is required. Please log in.");
      return;
    }
    formData.append("user", userId);
  
    if (selectedImage) {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      formData.append("image", blob, "post_image.jpg");
    }
  
    try {
      const response = await axiosInstance.post(`${requests.Posts}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        console.log("Post created successfully:", response.data);
        fetchDetails();
        setIsModalOpen(false);
        setContent("");
        setSelectedImage(null);
        
        Swal.fire({
          title: 'Success!',
          text: 'Your post has been created.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        console.error("Failed to create post:", response.data);
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("An error occurred while creating the post.");
    }
  };
  
  
  

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray">
            <h2 className="text-xl font-semibold">Create Post</h2>
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {selectedImage && (
              <div className="mb-4 relative">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="w-full h-auto rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  onClick={() => setSelectedImage(null)}
                >
                  <IoIosCloseCircleOutline size={20} />
                </button>
              </div>
            )}
            {/* Updated Textarea with Icons Inside */}
            <div className="relative">
              <textarea
                className="w-full h-24 border rounded-lg p-3 pr-14 border-gray leading-tight focus:outline-none focus:bg-white"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RiEmojiStickerLine size={20} />
                </button>
                <label
                  htmlFor="image-upload"
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <TbPhotoSquareRounded size={20} />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedImage(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute z-50"
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </motion.div>
              )}
            </div>
            <div className="flex justify-center flex-col">
              <button
                className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSave}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PostForm;
