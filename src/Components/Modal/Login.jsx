import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startLoading,
  loginSuccess,
  loginFailure,
} from "../../Redux/slices/authSlice";
import { useState } from "react";

export default function Login({ onOpenChange, isOpen }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startLoading());

    try {
      const response = await fakeLoginAPI(mobile, password);

      if (response.success) {
        dispatch(loginSuccess({ username: response.username }));
        navigate("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      dispatch(loginFailure());
      alert("Invalid credentials. Please try again.");
    }
  };

  const fakeLoginAPI = async (mobile, password) => {
    if (mobile === "1234567890" && password === "password123") {
      return { success: true, username: "testuser" };
    }
    return { success: false };
  };

  return (
    <>
      <Modal
        backdrop="blur"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/40 backdrop-blur-md",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-white shadow-xl rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-xl text-center font-bold">
                Welcome Back! Please Login
              </ModalHeader>
              <ModalBody>
                <form className="space-y-4 p-3" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label
                      htmlFor="mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile No
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      className="bg-gray-50 border border-gray text-gray-900 rounded-lg block w-full p-2.5"
                      placeholder="Mobile Number / Email Address"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray text-gray-900 rounded-lg block w-full p-2.5"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ outline: "none" }}
                    />
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="/forgot-password"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-[#4CAF50] hover:bg-[#45a049] font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors"
                  >
                    Login
                  </button>
                  <div className="flex items-center justify-center my-6">
                    <div className="flex-grow h-px bg-gray"></div>
                    <span className="px-4 text-gray-500 font-medium">OR</span>
                    <div className="flex-grow h-px bg-gray"></div>
                  </div>
                  <div className="flex flex-col items-center space-y-3">
                    <button
                      type="button"
                      className="w-full text-white bg-[#45858C] hover:bg-[#3b737a] font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Login with Mobile OTP
                    </button>
                    <button
                      type="button"
                      className="w-full text-white bg-[#D05353] hover:bg-[#bb4848] font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Login with Email OTP
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-gray-700">
                      New Here?{" "}
                      <a
                        href="/register"
                        className="text-[#4285f4] hover:underline font-medium"
                      >
                        Register Free
                      </a>
                    </p>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
