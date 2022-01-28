import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

import jsonData from "./jsonResponseData/mockResponse.json";

const HomeLayout = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const httpRequest = (data, index) => {
    console.log(jsonData[index]);
  };

  return (
    <main>
      {isAuthenticated && (
        <React.Fragment>
          {jsonData.map((element, index) => (
            <button key={index} onClick={() => httpRequest(element, index)}>
              {element.statusCode}
            </button>
          ))}

          <button onClick={logoutHandler}>Logout</button>
          <article>Container</article>
        </React.Fragment>
      )}
      {!isAuthenticated && <p>YOU ARE NOT AUTHENTICATED</p>}
    </main>
  );
};

export default HomeLayout;
