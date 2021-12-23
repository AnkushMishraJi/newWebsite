import React, { useState, useEffect } from "react";

const OldBill = () => {
  const getData = localStorage.getItem("OldBill");
  const billData = getData.split(",");

  return (
    <>
      <div>
        <p>Hotel : {billData[0]}</p>
        <p>Date of Booking : {billData[1]}</p>
        <p>Time of Arrival : {billData[9]} </p>
        <p>Billing Amount : Rs. {billData[2]}</p>
        <p>Order Id : {billData[3]}</p>
        <p>
          Date/Time of Payment : {billData[4]},{billData[5]}
        </p>
        <p>Time Slot :{billData[6]} Hrs</p>
        <p>Total Persons : {billData[7]} </p>
        <p>Type : {billData[8]} </p>
      </div>
    </>
  );
};

export default OldBill;
