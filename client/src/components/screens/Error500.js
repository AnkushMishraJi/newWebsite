import React, { useState, useEffect } from "react";
import image from "../../images/error-500.svg";

const Error500 = () => {
  return (
    <div className="my-5 text-center text-light">
      <h2 className="brand-logo f-32 ">SOMETHING WENT WRONG</h2>
      <img
        className=" mb-4 mx-auto"
        src={image}
        alt="Logo"
        style={{ width: "20em", height: "20em" }}
      />
      <p className="font-weight-bolder">
        Server Error 500. We apologise for the inconvenience.
      </p>

      <p className="font-weight-bolder brand-logo">Please try again later</p>
    </div>
  );
};

export default Error500;
