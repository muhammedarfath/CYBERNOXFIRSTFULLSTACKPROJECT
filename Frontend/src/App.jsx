import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

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
    </Router>
  );
}

export default App;
