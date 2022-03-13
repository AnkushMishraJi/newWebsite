import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FooterDesktop from "../FooterDesktop";
import LayoutHeader from "../LayoutHeader";
import LayoutMobile from "../LayoutMobile";
import { TabTitle } from "../TitleSetter";

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;

const UserPage = () => {
  const [name, setName] = useState(" ");
  const history = useHistory();

  TabTitle("Mera Adda | User");
  const [width, setWidth] = useState(0)

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    if (isBrowser()) {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone");
    fetch(`/api/getname?phoneNumber=${phoneNumber}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data);
        console.log(data);
      });
  }, []);
  return (
    <>
    {isMobile || width <= 980 ? null : <LayoutHeader />}
      <div className={`text-light mx-auto ${isMobile || width <= 980 ? `w-90` : `w-40`}`}>
        <style>{"body { background-color: black; }"}</style>
        <div className="row py-5 line-ht-2 ">
          <p>Hello</p>
          <p className="brand-logo f-32">{name}</p>
        </div>
        <div className="d-flex flex-column text-light">
          <Link className="user-page-btn px-3 py-2 m-3" to="/allBookings">
            Check Booking History
          </Link>
          <Link className="user-page-btn px-3 py-2 m-3" to="/">
            Browse Hotels
          </Link>
          <Link className="user-page-btn px-3 py-2 m-3" to="/services">
            Our Services
          </Link>
          <a className="user-page-btn px-3 py-2 m-3" href="tel:9569736905">
            Customer Care
          </a>
        </div>
        <p
          className=" user-page-btn font-weight-bolder py-2 w-40 mt-8"
          style={isMobile || width <= 980 ? {
            color: "black",
            background: "#fe9124",
            alignContent: "center",
            textAlign: "center",
            marginTop:'90%'
          }
          :
          {
            color: "black",
            background: "#fe9124",
            alignContent: "center",
            textAlign: "center",
            marginTop:'40%'
          }}
          onClick={logout}
        >
          Logout
        </p>
        <p> </p><br/>
        <p> </p><br/>
        <p> </p><br/>
        <p> </p><br/>
      </div>
      {
        isMobile || width <= 980 ?
        <LayoutMobile />
        :
        <FooterDesktop />
      }
    </>
  );
};

export default UserPage;
