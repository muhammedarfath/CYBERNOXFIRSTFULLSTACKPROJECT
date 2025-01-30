import React, { useEffect, useState } from "react";
import ProfileCards from "../Components/Section/HomeSec/ProfileCards";
import { MobileProfileCards } from "../Components/Section/HomeSec/MobileProfileCards";
import axiosInstance from "../axios";
import Loader from "../Components/Loading/Loader";
import requests from "../lib/urls";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`${requests.fetchUsers}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>
    <Loader/>
  </div>;


  return (
    <>
      <div className="hidden md:block">
        <ProfileCards slides={users}/>
      </div>
      <div className="md:hidden ">
        <MobileProfileCards slides={users} />
      </div>
    </>
  );
}

export default Home;
