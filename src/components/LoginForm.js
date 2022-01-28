import useInput from "./hooks/use-input";
import classes from "./LoginForm.module.css";

import { setWithExpiry } from "../utils";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

//5 minutes in miliseconds
const FIVE_MIN_EXPIRY = 1000 * 60 * 5;

const isEmpty = (value) => value.trim().length > 0;

// correct credentials for login
const serverData = {
  username: "user",
  password: "pass",
};

const LoginForm = (props) => {
  const [userExist, setUserExist] = useState(true);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const isUserExist = (user) => {
    if (
      user.username === serverData.username &&
      user.password === serverData.password
    ) {
      return true;
    } else {
      return false;
    }
  };

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUsername,
  } = useInput(isEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isEmpty);

  // const userNameCached = localStorage.getItem("username");
  // const userPasswordCached = localStorage.getItem("password");
  // //should handle case where user and pass are in local storage..

  // if (userNameCached && userPasswordCached) {
  // }

  let formIsValid = false;

  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const loginHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    let loginData = {
      username: username,
      password: password,
    };

    if (isUserExist(loginData)) {
      setUserExist(true);
      dispatch(authActions.login());
      navigate("/home");

      setWithExpiry(`username`, username, FIVE_MIN_EXPIRY);
      setWithExpiry(`password`, password, FIVE_MIN_EXPIRY);
    } else {
      setUserExist(false);
      return;
    }

    resetUsername();
    resetPassword();
  };

  const usernameClasses = `${classes.control} ${
    usernameHasError ? classes.invalid : ""
  }`;

  const passwordClasses = `${classes.control} ${
    passwordHasError ? classes.invalid : ""
  }`;

  return (
    <form onSubmit={loginHandler} classe={classes.form}>
      <div className={usernameClasses}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
          value={username}
        />
        {usernameHasError && (
          <p className={classes["error-text"]}>
            Please enter a valid username!
          </p>
        )}
      </div>
      <div className={passwordClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={password}
        />
        {passwordHasError && (
          <p className={classes["error-text"]}>
            Please enter a valid password!
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Login</button>
      </div>
      <div>{!userExist && <p>User does not exist!</p>}</div>
    </form>
  );
};

export default LoginForm;
