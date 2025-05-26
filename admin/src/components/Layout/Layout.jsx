import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import React from "react";

const Layout = () => {
  // Check if user is logged in (e.g., from localStorage)
  const isLoggedIn = !!localStorage.getItem("isUserLoggedIn");

  if (!isLoggedIn) {
    // User not logged in - render only the child routes (login pages etc.)
    return <Outlet />;
  }

  // User is logged in - render header, footer and child routes
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
