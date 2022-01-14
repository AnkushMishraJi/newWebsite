import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const UserPage = () => {
  const [name, setName] = useState(" ");
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

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
      <div className=" text-light  mx-4 w-90  ">
        <style>{"body { background-color: #1a1b41; }"}</style>
        <div className="row py-5 line-ht-2 ">
          <p>Hello</p>
          <p className="brand-logo f-32">{name}</p>
        </div>
        <div className="row text-light line-ht-8">
          <Link className="user-page-btn" to="/allBookings">
            Check Booking History
          </Link>
          <Link className="user-page-btn" to="/">
            Browse Hotels
          </Link>
          <Link className="user-page-btn" to="#">
            Our Services
          </Link>
          <a className="user-page-btn" href="tel:9569736905">
            Customer Care
          </a>
        </div>
        <p
          className=" user-page-btn px-auto font-weight-bolder pt-2"
          style={{
            color: "black",
            background: "#fe9124",
            height: "3em",
            alignContent: "center",
            textAlign: "center",
            position: "absolute",
            bottom: "5em",
          }}
          onClick={logout}
        >
          Logout
        </p>
      </div>
    </>
  );
};

export default UserPage;
