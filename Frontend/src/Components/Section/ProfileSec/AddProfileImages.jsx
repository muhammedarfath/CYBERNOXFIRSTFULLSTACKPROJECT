import React, { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"
import PostForm from "../../Modal/PostForm"

function AddProfileImages() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setSelectedImage(imageURL)
      setIsModalOpen(true)
    }
  }


  return (
    <>
      <div className="flex md:w-full flex-col mt-6 gap-4 p-5">
        <div>
          <button className="bg-button text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            UPLOAD YOUR PHOTOS
          </button>
          <span className="block mt-2 text-sm text-gray-600">
            Uploading good photos will help you get more responses on your profile.
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PostForm setIsModalOpen={setIsModalOpen} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      )}
    </>
  )
}

export default AddProfileImages

