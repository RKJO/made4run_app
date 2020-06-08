const sidebarStyle = {
  fixedPlugin: {
    position: "absolute",
    top: "1vh",
    right: "0",
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: "1031",
    borderRadius: "8px 0 0 8px",
  },
  faCog: {
    color: "#ffffff",
    padding: "7px",
    width: "45px",
  },
  dropdownMenu: {
    right: "50px",
    top: "-5px",
    left: "auto",
    width: "80vw",
    minHeight: "80vh",
    borderRadius: "0.3rem",
    padding: "0 10px",
    position: "absolute",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    background: "#fff",

    "@media (min-width: 576px)": {
      width: "80vw",
    },
    "@media (min-width: 768px)": {
      width: "60vw",
    },
    "@media (min-width: 960px)": {
      width: "30vw",
    },
    "@media (min-width: 1200px)": {
      width: "30vw",
    },
    "@media (min-width: 1400px)": {
      width: "30vw",
    },
  },
};
export { sidebarStyle };
