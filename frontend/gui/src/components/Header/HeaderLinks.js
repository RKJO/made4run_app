/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { NavLink, useLocation } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Button from "../../components/CustomButtons/Button.js";
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";

import styles from "../../assets/jss/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();
  const location = useLocation();

  switch (location.pathname) {
    case "/registration/login":
      return (
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <NavLink
              exact
              to='/registration/register'
              className={classes.navLink}
            >
              Zarejestruj się{" "}
            </NavLink>
          </ListItem>
        </List>
      );
    case "/registration/register":
      return (
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <NavLink exact to='/registration/login' className={classes.navLink}>
              Zaloguj
            </NavLink>
          </ListItem>
        </List>
      );
    default:
      return (
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <NavLink exact to='/competitions' className={classes.navLink}>
              Kalendarz zawodów
            </NavLink>
          </ListItem>
          {/* <ListItem className={classes.listItem}>
              <NavLink exact to='/events' className={classes.navLink}>
                Publiczne wydarzenia
              </NavLink>
            </ListItem> */}
          <ListItem className={classes.listItem}>
            <CustomDropdown
              hoverColor='danger'
              noLiPadding
              buttonText='Publiczne treningi'
              dropdownList={[
                <NavLink to='/events' className={classes.dropdownLink}>
                  Wsztkie publiczne treningi
                </NavLink>,
                // <NavLink to='#' className={classes.dropdownLink}>
                //   Treningi zespołowe
                // </NavLink>,
                // <NavLink to='#' className={classes.dropdownLink}>
                //   Treningi indywidualne
                // </NavLink>,
                <NavLink
                  to='/events/create_new_event'
                  className={classes.dropdownLink}
                >
                  Dodaj nowy trening
                </NavLink>,
              ]}
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink exact to='/teams' className={classes.navLink}>
              Zespoły
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Tooltip
              id='instagram-facebook'
              title='Follow us on facebook'
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                color='transparent'
                href=''
                target='_blank'
                className={classes.navLink}
              >
                <i className={classes.socialIcons + " fab fa-facebook"} />
              </Button>
            </Tooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Tooltip
              id='instagram-tooltip'
              title='Follow us on instagram'
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                color='transparent'
                href=''
                target='_blank'
                className={classes.navLink}
              >
                <i className={classes.socialIcons + " fab fa-instagram"} />
              </Button>
            </Tooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink exact to='/registration/login' className={classes.navLink}>
              Zaloguj
            </NavLink>
          </ListItem>
        </List>
      );
  }
};

export { HeaderLinks };
