import React, { useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Email from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { GridContainer } from "../../components/Grid/GridContainer.js";
import { GridItem } from "../../components/Grid/GridItem.js";
import { Card } from "../../components/Card/Card";
import { CardHeader } from "../../components/Card/CardHeader";
import { CardBody } from "../../components/Card/CardBody.js";
import { CardFooter } from "../../components/Card/CardFooter.js";

import Button from "../../components/CustomButtons/Button";

import { signUpPageStyles } from "../../assets/jss/containers/signUpPage";

import { AuthContext } from "../../context/auth/authContext";
import { AlertContext } from "../../context/alert/alertContext";

import image from "../../assets/img/login.jpg";
import brand from "../../assets/img/m4run_logo_sm.png";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(signUpPageStyles);

const Register = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { register, isRegistered } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({ email: "", password: "", password2: "" });
  const [showPass, setShowPass] = useState(false);

  const { email, password, password2 } = user;

  if (isRegistered) {
    return <Redirect to='/login' />;
  }

  const handleInputChange = (value, field) => {
    setUser((prevState) => {
      const prevLoginValues = { ...prevState };
      prevLoginValues[field] = value;
      return prevLoginValues;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || password2 === "") {
      setAlert("Uzupełnij wszytkie pola", "danger");
    } else if (password !== password2) {
      setAlert("Podane hasła nie są takie same", "danger", 1000);
    } else {
      register({ email, password });
    }
  };

  return (
    <>
      <GridContainer justify='center'>
        <GridItem xs={9} sm={6} md={4}>
          <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CardHeader color='gray' className={classes.cardHeader}>
                <img src={brand} alt='Logo' className={classes.logo} />
                <h4 className={classes.subtitle}>Zarejestruj się</h4>
                <div className={classes.socialLine}>
                  <Button
                    justIcon
                    href='/'
                    target='_blank'
                    color='transparent'
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className={"fab fa-twitter"} />
                  </Button>
                  <Button
                    justIcon
                    href='/'
                    target='_blank'
                    color='transparent'
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className={"fab fa-facebook"} />
                  </Button>
                  <Button
                    justIcon
                    href='/'
                    target='_blank'
                    color='transparent'
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className={"fab fa-google-plus-g"} />
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel className={classes.labelRoot} htmlFor={`email`}>
                    E-mail{" "}
                  </InputLabel>
                  <Input
                    type='text'
                    id={`email`}
                    value={user.email}
                    onChange={(e) =>
                      handleInputChange(e.target.value, e.target.id)
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel
                    className={classes.labelRoot}
                    htmlFor={`password`}
                  >
                    Hasło
                  </InputLabel>
                  <Input
                    id={`password`}
                    type={showPass ? "text" : "password"}
                    value={user.password}
                    onChange={(e) =>
                      handleInputChange(e.target.value, e.target.id)
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPass((prevState) => !prevState)}
                          onMouseDown={(event) => {
                            event.preventDefault();
                          }}
                        >
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel
                    className={classes.labelRoot}
                    htmlFor={`password2`}
                  >
                    Hasło 2
                  </InputLabel>
                  <Input
                    id={`password2`}
                    type={showPass ? "text" : "password"}
                    value={user.password2}
                    onChange={(e) =>
                      handleInputChange(e.target.value, e.target.id)
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPass((prevState) => !prevState)}
                          onMouseDown={(event) => {
                            event.preventDefault();
                          }}
                        >
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button type='submit' simple color='danger' size='lg'>
                  Zarejestruj
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export { Register };
