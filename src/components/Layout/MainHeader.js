import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

import { useSelector } from "react-redux";

const MainHeader = () => {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    color: "#95bcf0",
    paddingBottom: "0.25rem",
    borderBottom: "4px solid #95bcf0",
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          {!isAuthenticated && (
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
