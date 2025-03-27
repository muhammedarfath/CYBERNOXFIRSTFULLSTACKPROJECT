import React, { useContext, useEffect, useState } from "react";
import ProfileCards from "../Components/Section/HomeSec/ProfileCards";
import { MobileProfileCards } from "../Components/Section/HomeSec/MobileProfileCards";
import axiosInstance from "../axios";
import CardSkeleton from "../Components/Loading/CardSkeleton"; 
import requests from "../lib/urls";
import AuthContext from "../context/AuthContext";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchDetails } =
  useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`${requests.fetchUsers}`);
        setUsers(response.data);
        fetchDetails();
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CardSkeleton />; 

  return (
    <>
      <div className="hidden md:block">
        <ProfileCards slides={users} />
      </div>
      <div className="md:hidden">
        <MobileProfileCards slides={users} />
      </div>
    </>
  );
}

export default Home;