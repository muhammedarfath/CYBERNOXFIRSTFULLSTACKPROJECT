import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startLoading,
  loginSuccess,
  loginFailure,
} from "../../Redux/slices/authSlice";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";

export default function Login({ onOpenChange, isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {fetchDetails } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());

    try {
      const response = await loginAPI(mobile, email, password);
      if (response) {
        dispatch(
          loginSuccess({
            email: response.email,
            token: response.access,
            refresh: response.refresh,
            userId: response.userid,
          })
        );
        navigate("/");
        fetchDetails();
        Swal.fire({
          title: "Welcome Back",
          icon: "success",
          draggable: true
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      dispatch(loginFailure());
      toast.error("Invalid credentials. Please try again.")
    }
  };

  const loginAPI = async (mobile, email, password) => {
    const payload = { mobile, email, password };
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/login/",
      payload
    );
    return response.data;
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
                      className="bg-gray-50 border border-gray text-gray-900 rounded-lg block w-full p-2.5"
                      placeholder="Mobile Number / Email Address"
                      value={mobile || email}
                      onChange={(e) =>
                        mobile
                          ? setMobile(e.target.value)
                          : setEmail(e.target.value)
                      }
                      required
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
                      placeholder="Password"
                      className="bg-gray-50 border border-gray text-gray-900 rounded-lg block w-full p-2.5"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                    className="w-full text-white bg-button  font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors"
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
