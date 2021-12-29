import React, { useState, useEffect, useContext } from "react";
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
  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage")
  );

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
      <Link
        to="/"
        className="mx-auto"
        onClick={() => {
          setActivePage("home");
        }}
      >
        <FontAwesomeIcon
          tabIndex="1"
          className={`nav-icon ${activePage === "home" ? "f-32" : null}`}
          icon={faHome}
        />
      </Link>
      <Link
        to="#"
        className="mx-auto"
        onClick={() => {
          setActivePage("services");
        }}
      >
        <FontAwesomeIcon
          tabIndex="2"
          className={`mx-auto nav-icon ${
            activePage === "services" ? "f-32" : null
          }`}
          icon={faConciergeBell}
        />
      </Link>
      <Link
        to="/allBookings"
        className="mx-auto"
        onClick={() => {
          setActivePage("bookings");
        }}
      >
        <FontAwesomeIcon
          tabIndex="3"
          className={`mx-auto nav-icon ${
            activePage === "bookings" ? "f-32" : null
          }`}
          icon={faBookmark}
        />
      </Link>
      <Link
        to="/userpage"
        className="mx-auto"
        onClick={() => {
          setActivePage("login");
        }}
      >
        <FontAwesomeIcon
          tabIndex="4"
          className={`nav-icon ${activePage === "login" ? "f-32" : null}`}
          icon={faUser}
        />
      </Link>
    </div>
  );
}
export default NavigationBar;
