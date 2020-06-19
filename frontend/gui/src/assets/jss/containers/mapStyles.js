import { dangerColor } from "../main";

const mapStyles = {
  leafletContainer: {
    width: "100%",
    height: "82.4vh",
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
