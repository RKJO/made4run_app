import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  section: {
    padding: "70px 0",
    textAlign: "center",
    color: "black",
    minHeight: "100vh",
  },
};

const useStyles = makeStyles(styles);
const CompetitionList = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.section}></div>
    </>
  );
};

export { CompetitionList };
