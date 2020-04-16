import React from "react";

// @material-ui/core components
import { Header } from "../components/Header/Header";
import { HeaderLinks } from "../components/Header/HeaderLinks";
import { Footer } from "../components/Footer/Footer";

import logo from "../assets/img/m4run_logo_sm.png";

const BaseLayout = (props) => {
	return (
		<>
			<Header
				color='transparent'
				brand={logo}
				rightLinks={<HeaderLinks />}
				fixed
				changeColorOnScroll={{
					height: 250,
					color: "white",
				}}
			/>
			{props.children}
			<Footer />
		</>
	);
};

export { BaseLayout };
