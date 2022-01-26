import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import "../App.css";
import logo from "../images/logo_ma.png";
import user from "../images/user_icon.svg";

const DesktopNavbar= ()=>{
    const userClickHandler = ()=>{
        localStorage.setItem("route", "/userpage");
    }
    return (
        <>
        <div className="p-5 d-flex align-items-center justify-content-between">
            <div className="d-flex">
                <Link to="/">
                <img src={logo} alt="Logo" style={{ width: "4em", height: "4em" }}/>
                </Link>
                <p className="text-light f-32 my-auto font-weight-boldest m-3">MERA ADDA</p>
            </div>
            <Link to="/userpage" onClick={userClickHandler}>
                <img src={user} alt="Logo" style={{ width: "4em", height: "4em" }}/>
            </Link>
        </div>
        </>
    )
}

export default DesktopNavbar;