import React, { useEffect, useContext } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faConciergeBell,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

function NavigationBar() {
  const login = localStorage.getItem("businessLoggedIn");
  const history = useHistory();
  const location = useLocation();
  return (
    <div
      className="d-flex w-100 align-items-center "
      style={{
        position: "fixed",
        bottom: "0",
        backgroundColor: "white",
        height: "10vh",
        fontSize: "18px",
        zIndex: 5,
      }}
    >
      <Link to="/" className="mx-auto ">
        <FontAwesomeIcon tabIndex="1" className="nav-icon" icon={faHome} />
      </Link>
      <Link to="#" className="mx-auto">
        <FontAwesomeIcon
          tabIndex="2"
          className="mx-auto nav-icon"
          icon={faConciergeBell}
        />
      </Link>
      <Link to="/allBookings" className="mx-auto">
        <FontAwesomeIcon
          tabIndex="3"
          className="mx-auto nav-icon"
          icon={faBookmark}
        />
      </Link>
      <Link to="/userpage" className="mx-auto">
        <FontAwesomeIcon tabIndex="4" className="nav-icon" icon={faUser} />
      </Link>
    </div>
  );
}
export default NavigationBar;
