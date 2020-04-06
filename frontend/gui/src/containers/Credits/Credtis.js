import React from "react";
import { List, ListItem } from "@material-ui/core";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

function Credits(props) {
  return (
    <>
      <List>
        <ListItem>
          Styles &copy; {1900 + new Date().getYear()} , made with <Favorite />{" "}
          by{" "}
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
        </ListItem>
      </List>
    </>
  );
}

export { Credits };
