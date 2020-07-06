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

const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      // console.log(action);
      //   localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        // token: null,
        isRegistered: true,
        // loading: false,
        // user: null,
        // error: action.payload,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
        error: action.payload,
      };
    case USER_LOADED:
      console.log("USER_LOADED");
      break;
    case AUTH_ERROR:
      console.log("AUTH_ERROR");
      break;
    case LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS");
      break;
    case LOGIN_FAIL:
      console.log("LOGIN_FAIL");
      break;
    case LOGOUT:
      console.log("LOGOUT");
      break;
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export { AuthReducer };
