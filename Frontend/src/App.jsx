import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import { Register } from "./Pages/Register";
import BasicDetails from "./Pages/BasicDetails";
import PriceingPlan from "./Pages/PriceingPlan";
import BestMatchs from "./Pages/BestMatchs";
import Profile from "./Pages/Profile";
import InterestRecieved from "./Pages/InterestRecieved";
import Message from "./Pages/Message";
import Layout from "./Components/Layout/Layout";
import ProfileDetails from "./Pages/ProfileDetails";
import SearchSec from "./Components/Search/SearchSec";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import ChatArea from "./Components/Section/MessageSec/ChatArea";
import Error from "./Pages/Error";
import PrivateRoute from "./lib/PrivateRoute";
import { Toaster } from "react-hot-toast";
import AadharOtp from "./Pages/AadharOtp";
import ForgotPassword from "./Components/Section/RegisterSec/ForgotPassword";
import ResetPassword from "./Components/Section/RegisterSec/ResetPassword";
import NotFoundPage from "./Pages/404";
import { useNotification } from "./context/NotificationProvider";
import { MessageNotificationContext } from "./context/MessageNotificationContext";
import { useSelector } from "react-redux";
import { w3cwebsocket } from "websocket";

function App() {
  const { fetchUnreadNotifications, setMessageUnreadCount } = useNotification();
  const location = useLocation(); // Get the current location
  const { addNotification } = useContext(MessageNotificationContext);
  const { userId, token: accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId && accessToken) {
      const notificationSocket = new w3cwebsocket(
        `ws://localhost:8000/ws/messagenotifications/${userId}/?token=${accessToken}`
      );

      notificationSocket.onopen = () => {
        console.log("WebSocket notification connected");
      };

      notificationSocket.onerror = (error) => {
        console.error("WebSocket error:", error.message);
      };

      notificationSocket.onclose = () => {
        console.log("WebSocket notification disconnected");
      };

      notificationSocket.onmessage = (event) => {
        try {
          const dataFromServer = JSON.parse(event.data);
          if (dataFromServer.type === "notification") {
            addNotification({
              user: dataFromServer.user,
              message: dataFromServer.message,
            });
            setMessageUnreadCount((prev) => prev + 1);
          }
        } catch (error) {
          console.log("Error handling notification:", error);
        }
      };

      return () => {
        notificationSocket.close();
      };
    }
  }, [userId, accessToken, addNotification]);

  useEffect(() => {
    fetchUnreadNotifications();
  }, [location.pathname]); // Trigger on every route change

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/bestmatch"
            element={
              <PrivateRoute>
                <BestMatchs />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profiledetails"
            element={
              <PrivateRoute>
                <ProfileDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/interest"
            element={
              <PrivateRoute>
                <InterestRecieved />
              </PrivateRoute>
            }
          />
          <Route
            path="/message"
            element={
              <PrivateRoute>
                <Message />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchSec />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/otp"
            element={
                <AadharOtp />
            }
          /> */}
          <Route
            path="/chatarea/:name"
            element={
              <PrivateRoute>
                <ChatArea />
              </PrivateRoute>
            }
          />
          <Route
            path="/error"
            element={
              <PrivateRoute>
                <Error />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Other private routes */}
        <Route
          path="/basic-details"
          element={
            <PrivateRoute>
              <BasicDetails />
            </PrivateRoute>
          }
        />

        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

        <Route
          path="/pricing"
          element={
            <PrivateRoute>
              <PriceingPlan />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
