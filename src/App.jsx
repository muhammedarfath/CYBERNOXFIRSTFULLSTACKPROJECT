import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bestmatch" element={<BestMatchs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profiledetails" element={<ProfileDetails />} />
          <Route path="/interest" element={<InterestRecieved />} />
          <Route path="/message" element={<Message />} />
          <Route path="/search" element={<SearchSec />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/basic-details" element={<BasicDetails />} />
        <Route path="/pricing" element={<PriceingPlan />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  );
}

export default App;
