import {
  defaultFont,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  whiteColor,
  blackColor,
  grayColor,
  infoColor,
  successColor,
  dangerColor,
  roseColor,
  primaryColor,
  warningColor,
} from "../main.js";

const alertStyle = {
  root: {
    ...defaultFont,
    flexWrap: "unset",
    position: "relative",
    padding: "20px 15px",
    lineHeight: "20px",
    marginBottom: "20px",
    fontSize: "14px",
    backgroundColor: whiteColor,
    color: grayColor,
    borderRadius: "3px",
    minWidth: "unset",
    maxWidth: "unset",
    boxShadow:
      "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0,0,0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)",
  },
  top20: {
    top: "20px",
  },
  top40: {
    top: "40px",
  },
  info: {
    backgroundColor: infoColor,
    color: whiteColor,
    ...infoBoxShadow,
  },
  success: {
    backgroundColor: successColor,
    color: whiteColor,
    ...successBoxShadow,
  },
  warning: {
    backgroundColor: warningColor,
    color: whiteColor,
    ...warningBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor,
    color: whiteColor,
    ...dangerBoxShadow,
  },
  primary: {
    backgroundColor: primaryColor,
    color: whiteColor,
    ...primaryBoxShadow,
  },
  rose: {
    backgroundColor: roseColor,
    color: whiteColor,
    ...roseBoxShadow,
  },
  message: {
    padding: "0",
    display: "block",
    maxWidth: "89%",
  },
  close: {
    width: "11px",
    height: "11px",
  },
  iconButton: {
    width: "24px",
    height: "24px",
    padding: "0px",
  },
  icon: {
    display: "block",
    left: "15px",
    position: "absolute",
    top: "50%",
    marginTop: "-15px",
    width: "30px",
    height: "30px",
  },
  infoIcon: {
    color: infoColor,
  },
  successIcon: {
    color: successColor,
  },
  warningIcon: {
    color: warningColor,
  },
  dangerIcon: {
    color: dangerColor,
  },
  primaryIcon: {
    color: primaryColor,
  },
  roseIcon: {
    color: roseColor,
  },
  iconMessage: {
    paddingLeft: "50px",
    display: "block",
  },
};

export { alertStyle };
