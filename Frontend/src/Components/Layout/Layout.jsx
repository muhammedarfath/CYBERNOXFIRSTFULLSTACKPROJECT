import React from "react";
import Header from "../Header/HomeHeader/Header";
import { Outlet } from "react-router-dom";
import MobileFooterMenu from "../MobileFooterMenu/MobileFooterMenu";

function Layout() {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      
      <main className="flex-grow overflow-hidden pb-16">
        <Outlet />
      </main>
      
      <MobileFooterMenu />

    </div>
  );
}

export default Layout;
