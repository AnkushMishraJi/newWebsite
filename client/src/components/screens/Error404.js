import React, { useState, useEffect } from "react";
import logo from "../../images/error-400.svg";

const Error404 = () => {
  return (
    <div className=" my-5  text-center text-light " style={{ height: "70vh" }}>
      <h2 className="brand-logo f-32 ">LOST IN SPACE - 404</h2>
      <img
        className=" mb-4 mx-auto pt-5"
        src={logo}
        alt="Logo"
        style={{ width: "20em", height: "20em" }}
      />
      <p className="font-weight-bolder pt-5">
        You have ventured into the unknown.
      </p>
      <a
        href="/"
        className="mt-3 mx-auto font-weight-bolder  d-inline-block "
        style={{
          backgroundColor: "#fe9124",
          height: "3em",
          width: "15em",
          borderRadius: "8px",
          border: "none",
          color: "#1a1b41",
          paddingTop: "0.7em",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        Take Me Back
      </a>
    </div>
  );
};

export default Error404;
