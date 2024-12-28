import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLoading, loginSuccess, loginFailure } from "../../Redux/slices/authSlice"; 
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
        <ModalContent className="bg-white shadow-xl rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <form
                  className="space-y-4 md:space-y-6 p-3"
                  onSubmit={handleSubmit}
                >
                  <div>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mobile Number"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)} // Update mobile state
                    />
                  </div>
                  <div>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
