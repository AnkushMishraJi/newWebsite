import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import * as ReactBootStrap from "react-bootstrap";
function NavigationBar() {
  const login = localStorage.getItem("businessLoggedIn");
  return (
    <ReactBootStrap.Navbar
      collapseOnSelect
      expand="xl"
      bg="primary"
      variant="dark"
    >
      {login !== "true" ? (
        <ReactBootStrap.Navbar.Brand
          style={{
            width: "55%",
            marginLeft: "10px",
          }}
          href="/"
        >
          MERA ADDA
        </ReactBootStrap.Navbar.Brand>
      ) : (
        <ReactBootStrap.Navbar.Brand
          style={{ width: "55%", marginLeft: "10px" }}
          href="/hoteladmin"
        >
          MERA ADDA
        </ReactBootStrap.Navbar.Brand>
      )}
      <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <ReactBootStrap.Navbar.Collapse
        style={{
          backgroundColor: "blue",
          height: "50%",
          zIndex: "1020",
          justifyContent: "space-around",
        }}
        id="responsive-navbar-nav"
      >
        <ReactBootStrap.Nav>
          <Link style={{ textDecoration: "none" }} to="/bsignup">
            <ReactBootStrap.Nav.Link href="/bsignup">
              Business Sign-up
            </ReactBootStrap.Nav.Link>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/bsignin">
            <ReactBootStrap.Nav.Link href="/bsignin">
              Business Sign-in
            </ReactBootStrap.Nav.Link>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/uphone">
            <ReactBootStrap.Nav.Link href="/uphone">
              User Sign-in
            </ReactBootStrap.Nav.Link>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/usignup">
            <ReactBootStrap.Nav.Link href="/usignup">
              User Sign-up
            </ReactBootStrap.Nav.Link>
          </Link>
        </ReactBootStrap.Nav>
      </ReactBootStrap.Navbar.Collapse>
    </ReactBootStrap.Navbar>
  );
}
export default NavigationBar;
