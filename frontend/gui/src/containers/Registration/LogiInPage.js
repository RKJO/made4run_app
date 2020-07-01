import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";

import Icon from "@material-ui/core/Icon";
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

import image from "../../assets/img/login.jpg";
import brand from "../../assets/img/m4run_logo_sm.png";
const useStyles = makeStyles(signUpPageStyles);

const LogiInPage = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleInputChange = (value, field) => {
    setFormData((prevState) => {
      const prevLoginValues = { ...prevState };
      prevLoginValues[field] = value;
      return prevLoginValues;
    });
  };

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <div className={classes.container}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader color='gray' className={classes.cardHeader}>
                  <img src={brand} alt='Logo' className={classes.logo} />
                  <h4 className={classes.subtitle}>Login</h4>
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
                      value={formData.email}
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
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange(e.target.value, e.target.id)
                      }
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() =>
                              setShowPass((prevState) => !prevState)
                            }
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
                  <Button simple color='danger' size='lg'>
                    Zaloguj
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      ;
    </div>
  );
};

export { LogiInPage };
