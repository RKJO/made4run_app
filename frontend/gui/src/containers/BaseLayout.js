import React from "react";

import { useLocation } from "react-router-dom";
// @material-ui/core components
import { Header } from "../components/Header/Header";
import { HeaderLinks } from "../components/Header/HeaderLinks";
import { Footer } from "../components/Footer/Footer";

import logo from "../assets/img/m4run_logo_sm.png";

const BaseLayout = (props) => {
  const location = useLocation();

  const headerControler = () => {
    switch (location.pathname) {
      case "/events":
        return { color: "white" };
      default:
        return {
          color: "transparent",
          fixed: true,
          changeColorOnScroll: {
            height: 250,
            color: "white",
          },
        };
    }
  };
  return (
    <>
      <Header
        {...headerControler()}
        brand={logo}
        rightLinks={<HeaderLinks />}
      />
      {props.children}
      <Footer />
    </>
  );
};

export { BaseLayout };
