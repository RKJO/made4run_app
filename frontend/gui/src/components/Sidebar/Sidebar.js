import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { sidebarStyle } from "../../assets/jss/components/sidebarStyle";

const useStyles = makeStyles(sidebarStyle);

const Sidebar = (props) => {
  const classes = useStyles();
  const { children } = props;

  const [toggleDropdown, setToggleDropdown] = useState(true);

  const handleFixedClick = () => {
    setToggleDropdown((prevstate) => !prevstate);
  };
  return (
    <div className={classes.fixedPlugin}>
      <div onClick={handleFixedClick}>
        <i className={"fa fa-cog fa-2x " + classes.faCog} />
      </div>
      {toggleDropdown && <div className={classes.dropdownMenu}>{children}</div>}
    </div>
    // </div>
  );
};

export { Sidebar };
