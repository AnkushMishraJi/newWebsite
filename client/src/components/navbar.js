import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
  return (
    // <ReactBootStrap.Navbar
    //   collapseOnSelect
    //   expand="xl"
    //   bg="primary"
    //   variant="dark"
    // >
    //   {login !== "true" ? (
    //     <ReactBootStrap.Navbar.Brand
    //       style={{
    //         width: "55%",
    //         marginLeft: "10px",
    //       }}
    //       href="/"
    //     >
    //       MERA ADDA
    //     </ReactBootStrap.Navbar.Brand>
    //   ) : (
    //     <ReactBootStrap.Navbar.Brand
    //       style={{ width: "55%", marginLeft: "10px" }}
    //       href="/hoteladmin"
    //     >
    //       MERA ADDA
    //     </ReactBootStrap.Navbar.Brand>
    //   )}
    //   <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <ReactBootStrap.Navbar.Collapse
    //     style={{
    //       backgroundColor: "blue",
    //       height: "50%",
    //       zIndex: "1020",
    //       justifyContent: "space-around",
    //     }}
    //     id="responsive-navbar-nav"
    //   >
    //     <ReactBootStrap.Nav>
    //       <Link style={{ textDecoration: "none" }} to="/bsignup">
    //         <ReactBootStrap.Nav.Link href="/bsignup">
    //           Business Sign-up
    //         </ReactBootStrap.Nav.Link>
    //       </Link>
    //       <Link style={{ textDecoration: "none" }} to="/bsignin">
    //         <ReactBootStrap.Nav.Link href="/bsignin">
    //           Business Sign-in
    //         </ReactBootStrap.Nav.Link>
    //       </Link>
    //       <Link style={{ textDecoration: "none" }} to="/uphone">
    //         <ReactBootStrap.Nav.Link href="/uphone">
    //           User Sign-in
    //         </ReactBootStrap.Nav.Link>
    //       </Link>
    //       <Link style={{ textDecoration: "none" }} to="/usignup">
    //         <ReactBootStrap.Nav.Link href="/usignup">
    //           User Sign-up
    //         </ReactBootStrap.Nav.Link>
    //       </Link>
    //     </ReactBootStrap.Nav>
    //   </ReactBootStrap.Navbar.Collapse>
    // </ReactBootStrap.Navbar>
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
        <FontAwesomeIcon className=" opacity-60" icon={faHome} />
      </Link>
      <Link to="#" className="mx-auto">
        <FontAwesomeIcon
          className="mx-auto opacity-50"
          icon={faConciergeBell}
        />
      </Link>
      <Link to="/allBookings" className="mx-auto">
        <FontAwesomeIcon className="mx-auto opacity-50" icon={faBookmark} />
      </Link>
      <Link to="#" className="mx-auto">
        <FontAwesomeIcon className="opacity-50" icon={faUser} />
      </Link>
    </div>
  );
}
export default NavigationBar;
