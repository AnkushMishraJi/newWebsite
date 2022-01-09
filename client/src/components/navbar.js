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
          className="nav-icons"
          style={
            activePage == "home"
              ? { color: "#1a1b41", outline: "none", opacity: "100%" }
              : { color: "#1a1b41", outline: "none", opacity: "50%" }
          }
          icon={faHome}
        />
      </Link>
      <Link
        to="/services"
        className="mx-auto"
        onClick={() => {
          setActivePage("services");
        }}
      >
        <FontAwesomeIcon
          tabIndex="2"
          className="nav-icons"
          style={
            activePage == "services"
              ? { color: "#1a1b41", outline: "none", opacity: "100%" }
              : { color: "#1a1b41", outline: "none", opacity: "50%" }
          }
          icon={faConciergeBell}
        />
      </Link>
      <Link
        to="/allBookings"
        className="mx-auto"
        onClick={() => {
          setActivePage("bookings");
          localStorage.setItem("route", "/allBookings");
        }}
      >
        <FontAwesomeIcon
          tabIndex="3"
          className="nav-icons"
          style={
            activePage == "bookings"
              ? { color: "#1a1b41", outline: "none", opacity: "100%" }
              : { color: "#1a1b41", outline: "none", opacity: "50%" }
          }
          icon={faBookmark}
        />
      </Link>
      <Link
        to="/userpage"
        className="mx-auto"
        onClick={() => {
          localStorage.setItem("route", "/userpage");
          setActivePage("login");
        }}
      >
        <FontAwesomeIcon
          tabIndex="4"
          className="nav-icons"
          style={
            activePage == "login"
              ? { color: "#1a1b41", outline: "none", opacity: "100%" }
              : { color: "#1a1b41", outline: "none", opacity: "50%" }
          }
          icon={faUser}
        />
      </Link>
    </div>
  );
}
export default NavigationBar;
