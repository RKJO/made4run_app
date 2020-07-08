import { dangerColor } from "../main";

const mapStyles = {
  dangerColor: {
    color: dangerColor,
    opacity: "0.7",
  },
  leafletContainer: {
    width: "100%",
    height: "82.4vh",
  },
  leafletSmall: {
    width: "100%",
    height: "22.4vh",
  },
  polylineStyle: {
    stroke: dangerColor,
    strokeDasharray: "20,20",
    strokeWidth: "7",
    opacity: "0.6",
    margin: "10px",
  },
};

export { mapStyles };
