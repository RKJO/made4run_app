import React, { useReducer } from "react";
import { AuthContext } from "./authContext";
import { AuthReducer } from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const apiURL = process.env.REACT_APP_API_URL;

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isRegistered: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // LoadUser
  const loadUser = () => async (formData) => {
    try {
      const response = await fetch(`${apiURL}auth/users/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log("loadUsererr", err);
    }
  };
  // RegisterUser
  const register = async (formData) => {
    try {
      const response = await fetch(`${apiURL}auth/users/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: data,
        });
      }
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  // LoginUser
  const loginUser = async (formData) => {
    try {
      const response = await fetch(`${apiURL}auth/token/login/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("resp", response, "data", data);
      if (response.ok) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: data,
        });
      }
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  };

  // Logout
  const logout = () => console.log("logout");

  // Claer Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isRegistered: state.isRegistered,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        loginUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthState };
