import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import React, { useState, useEffect } from "react";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isUserLoggedIn");
    console.log(loggedIn)
    setIsLoggedIn(loggedIn === "true"); 
  }, []);

  return (
    <>
      {isLoggedIn && <Sidebar />}
      <Outlet />
    </>
  );
};

export default Layout;
