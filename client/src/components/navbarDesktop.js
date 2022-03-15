import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import "../App.css";
import logo from "../images/logo_ma.png";
import user from "../images/person.svg";

const DesktopNavbar= (props)=>{
    const history = useHistory();
    const userClickHandler = ()=>{
        localStorage.setItem("route", "/userpage");
    }
    return (
        <>
        <div className="px-5 py-2 d-flex align-items-center justify-content-between w-100" style={{position:'absolute', top: "0%", zIndex:'999',backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
            <div className="d-flex">
                <Link to="/">
                    <img src={logo} alt="Logo" style={{ width: "3em", height: "3em" }}/>
                </Link>
                {/* <a href='/' className="text-light f-24 my-auto font-weight-boldest m-3">MERA ADDA</a> */}
            </div>

            {props.page=='landing' ?
            <div className='d-flex w-40 align-items-center justify-content-around'>
                <Link className='px-3 d-flex align-items-center text-light' to="/userpage" onClick={userClickHandler}>
                    <img src={user} alt="Logo" style={{ width: "2em", height: "2em" }}/>
                    <p className='my-auto'>Log In/Sign Up</p>
                </Link>
                <button className='text-light p-2 f-16 px-3' onClick={()=>{history.push("/")}} style={{backgroundColor:'#FF3030',border:'none', outline:'none', borderRadius:'6px'}}>Book Now</button>
            </div>
            :
            <div className='d-flex w-40 align-items-center justify-content-end'>
                <Link className='px-3 d-flex align-items-center text-light' to="/userpage" onClick={userClickHandler}>
                    <img src={user} alt="Logo" style={{ width: "2em", height: "2em" }}/>
                    <p className='my-auto'>Log In/Sign Up</p>
                </Link>
            </div>
            }
        </div>
        </>
    )
}

export default DesktopNavbar;