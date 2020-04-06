import React from "react";

// @material-ui/core components
import { Header } from "../components/Header/Header";
import { HeaderLinks } from "../components/Header/HeaderLinks";
import { Footer } from "../components/Footer/Footer";

function BaseLayout(props) {
  return (
    <>
      <Header
        color='transparent'
        brand='Made4Run'
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      {props.children}
      <Footer />
    </>
  );
}

export { BaseLayout };
