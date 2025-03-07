import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axios";
import requests from "../lib/urls";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 




  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const [profileResponse, postsResponse] = await Promise.all([
        axiosInstance.get(`${requests.fetchProfileDetails}`),
        axiosInstance.get(`${requests.Posts}`),
      ]);

      if (profileResponse.data) setProfileDetails(profileResponse.data);
      if (postsResponse.data) setPosts(postsResponse.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false); 
    }
  };



  const logoutUser = () => {
    setProfileDetails(null);
    setPosts([]);
  };

  return (
    <AuthContext.Provider value={{ profileDetails, posts, setPosts, loading , logoutUser,fetchDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
