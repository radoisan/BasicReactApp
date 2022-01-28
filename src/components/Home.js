import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

import { useState } from "react";

import classes from "./Home.module.css";

import jsonData from "./jsonResponseData/mockResponse.json";

import { removeItemLocalStorage } from "../utils";

import { useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState();
  const [requestError, setRequestError] = useState();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());

    removeItemLocalStorage("password");
    removeItemLocalStorage("username");
  };

  const httpRequest = (data, index) => {
    if (data.statusCode === 200) {
      setProductData(data.data);
      setRequestError();
      console.log("PRODUCT DATA:", data.data);
    }
    if (data.statusCode === 404) {
      setRequestError(data.headers);
      console.log("ERROR 404: ", data.headers["x-message"]);
    }
    if (data.statusCode === 401) {
      removeItemLocalStorage("password");
      removeItemLocalStorage("username");

      setRequestError(data.headers);

      dispatch(authActions.logout());

      navigate("/home");
      console.log("ERROR 401: ", data.headers["x-message"]);
    }
  };

  return (
    <main>
      {isAuthenticated && (
        <React.Fragment>
          <div className={classes.actions}>
            {jsonData.map((element, index) => (
              <button
                className={classes.submit}
                key={index}
                onClick={() => httpRequest(element, index)}
              >
                {element.statusCode}
              </button>
            ))}

            <button className={classes.submit} onClick={logoutHandler}>
              Logout
            </button>
          </div>
          {productData && !requestError && (
            <article className={classes.container}>
              <p>{productData.name}</p>
              <p>{productData.price}</p>
              <p
                className={classes.dot}
                style={{ backgroundColor: productData.color }}
              >
                {productData.color}
              </p>
            </article>
          )}
          {requestError && (
            <article className={classes.container}>
              <p style={{ backgroundColor: "red" }}>
                {requestError["x-message"]}
              </p>
            </article>
          )}
        </React.Fragment>
      )}
      {!isAuthenticated && <p>YOU ARE NOT AUTHENTICATED</p>}
    </main>
  );
};

export default HomeLayout;
