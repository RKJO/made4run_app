import React from "react";
import { List, ListItem } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import { container } from "../../assets/jss/main";

const styles = {
  container: {
    zIndex: "12",
    // color: "#FFFFFF",
    ...container,
  },
  main: {
    // background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
};

const useStyles = makeStyles(styles);

const Credits = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.section}>
          <List>
            <ListItem>
              Styles &copy; {1900 + new Date().getYear()} , made with{"\u00a0 "}
              <Favorite />
              {"\u00a0 "}by{"\u00a0 "}
              <a
                href='https://www.creative-tim.com?ref=mkr-footer'
                target='_blank'
                rel='noopener noreferrer'
              >
                Creative Tim
              </a>{" "}
              for a better web.
            </ListItem>
            <ListItem>
              <a
                href='https://www.pexels.com/pl-pl/@mfoster106'
                target='_blank'
                rel='noopener noreferrer'
              >
                Michael Foster
              </a>
            </ListItem>
            <ListItem>
              <a
                href='https://www.pexels.com/pl-pl/@olly'
                target='_blank'
                rel='noopener noreferrer'
              >
                Zdjęcie autorstwa Andrea Piacquadio z Pexels
              </a>
              Photo by Steven Lelham on Unsplash -team
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export { Credits };
