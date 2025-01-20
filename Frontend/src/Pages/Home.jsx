import React, { useEffect } from "react";
import ProfileCards from "../Components/Section/HomeSec/ProfileCards";
import { MobileProfileCards } from "../Components/Section/HomeSec/MobileProfileCards";
import slide_img_1 from "../assets/Screenshot 2024-12-27 at 11.53.55 AM.png";
import slide_img_2 from "../assets/Screenshot 2024-12-27 at 11.46.41 AM.png";
import slide_img_3 from "../assets/Screenshot 2024-12-27 at 11.48.47 AM.png";
import slide_img_4 from "../assets/Screenshot 2024-12-27 at 11.49.50 AM.png";
import slide_img_5 from "../assets/Screenshot 2024-12-27 at 11.50.31 AM.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate("/register");
    }
  }, [isLoggedIn, token, navigate]);

  const slideData = [
    {
      imgsrc: slide_img_1,
      name: "raku, 19",
      pronoun: "She",
      status: "Not Working",
      university: "Calcutta University 2020",
    },
    {
      imgsrc: slide_img_2,
      name: "John, 25",
      pronoun: "He",
      status: "Software Engineer",
      university: "XYZ University 2021",
    },
    {
      imgsrc: slide_img_3,
      name: "Asha, 22",
      pronoun: "She",
      status: "Student",
      university: "ABC University 2022",
    },
    {
      imgsrc: slide_img_4,
      name: "Arjun, 27",
      pronoun: "He",
      status: "Designer",
      university: "DEF University 2019",
    },
    {
      imgsrc: slide_img_5,
      name: "Maya, 23",
      pronoun: "She",
      status: "Photographer",
      university: "LMN University 2020",
    },
  ];
  return (
    <>
      <div className="hidden md:block">
        <ProfileCards />
      </div>
      <div className="md:hidden ">
        <MobileProfileCards slides={slideData} />
      </div>
    </>
  );
}

export default Home;
