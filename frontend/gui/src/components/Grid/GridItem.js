import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    padding: "15px",
    flexBasis: "auto",
  },
};

const useStyles = makeStyles(styles);

const GridItem = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
};

GridItem.defaultProps = {
  className: "",
};

export { GridItem };
