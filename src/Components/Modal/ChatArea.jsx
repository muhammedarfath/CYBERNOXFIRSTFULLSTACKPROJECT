import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import slide_img_4 from "../../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";

export default function ChatArea({ onOpenChange, isOpen }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="full"
        onOpenChange={onOpenChange}
        className="bg-white shadow-2xl rounded-2xl overflow-scroll h-full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                QuickChat
              </ModalHeader>
              <ModalBody>
                <div className="flex h-full antialiased text-black">
                  <div className="flex md:flex-row flex-col gap-4 md:gap-0 h-full w-full overflow-x-hidden">
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
                        <div className="ml-2 font-bold text-2xl ">
                          QuickChat
                        </div>
                      </div>
                      <div className="flex flex-col text-white items-center bg-primary mt-4 w-full py-6 px-4 rounded-lg">
                        <div className="h-20 w-20 rounded-full overflow-hidden">
                          <img
                            src={slide_img_4}
                            alt="Avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="text-sm font-semibold mt-2">
                          Aminos Co.
                        </div>
                        <div className="text-xs">Lead UI/UX Designer</div>
                        <div className="flex flex-row items-center mt-3">
                          <div className="flex flex-col justify-center h-4 w-8  rounded-full">
                            <div className="h-3 w-3 bg-[#5BE65C] rounded-full self-end mr-1"></div>
                          </div>
                          <div className="leading-none ml-1 text-xs">
                            Active
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col flex-auto h-auto ">
                      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray h-full p-4">
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                          <div className="flex flex-col h-full">
                            <div className="grid grid-cols-12 gap-y-2">
                              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-black flex-shrink-0">
                                    A
                                  </div>
                                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>Hey How are you today?</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black text-white flex-shrink-0">
                                    A
                                  </div>
                                  <div className="relative mr-3 text-sm bg-lightgreen py-2 px-4 shadow rounded-xl">
                                    <div>I'm ok what about you?</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <button className="flex items-center justify-center bg-button hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
