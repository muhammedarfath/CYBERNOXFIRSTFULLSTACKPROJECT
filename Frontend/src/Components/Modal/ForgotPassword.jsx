import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function ForgotPassword({ onOpenChange, isOpen }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/forgot-password/", { email });
      if (response.status === 200) {
        Swal.fire({
          title: "Check Your Email",
          text: "We have sent a password reset link to your email.",
          icon: "success",
        });
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/40 backdrop-blur-md",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white shadow-xl rounded-2xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col text-xl text-center font-bold">
              Forgot Password?
            </ModalHeader>
            <ModalBody>
              <form className="space-y-4 p-3" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Your Registered Email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray text-gray-900 rounded-lg block w-full p-2.5"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ outline: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-button font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
