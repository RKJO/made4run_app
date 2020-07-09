import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// react components for routing our app without refres
import { Switch, Route } from "react-router-dom";

import { Login } from "../Registration/Login";
import { Register } from "../Registration/Register";
import { ContextAlert } from "../../components/Alert/ContextAlert";

import { signUpPageStyles } from "../../assets/jss/containers/signUpPage";

import image from "../../assets/img/login.jpg";

const useStyles = makeStyles(signUpPageStyles);

const RegistrationPage = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <main className={classes.main}>
        <div className={classes.container}>
          <ContextAlert />

          <Switch>
            <Route path='/registration/login' component={Login} />
            <Route path='/registration/register' component={Register} />
            {/* <Route path='/registration/logout' component={Logout} /> */}
          </Switch>
        </div>
      </main>
    </div>
  );
};

export { RegistrationPage };
