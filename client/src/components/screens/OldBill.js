import React, { useState, useEffect } from "react";

const OldBill = () => {
  const getData = localStorage.getItem("OldBill");
  const billData = getData.split(",");
  const DateOfBooking = new Date(billData[1]).toDateString();
  const [show, setShow] = useState(false);
  const today = new Date().toDateString();
  const isToday = () => {
    if (DateOfBooking == today) {
      setShow(true);
    } else setShow(false);
  };

  useEffect(() => {
    isToday();
    console.log(DateOfBooking);
    console.log(today);
  }, []);
  return (
    <>
      <p className="brand-logo text-center f-24 mt-5">Bill</p>
      <div className="oldbill text-light ">
        <p>Hotel : </p>
        <p>{billData[0]}</p>
        <p>Date of Arrival : </p>
        <p>{billData[1]}</p>
        <p>Time of Arrival : </p>
        <p>{billData[9]} </p>
        <p>Billing Amount : </p>
        <p>Rs. {billData[2]}</p>
        <p>Order Id : </p>
        <p>{billData[3]}</p>
        <p>Date/Time of Payment : </p>
        <p>
          {billData[4]},{billData[5]}
        </p>
        <p>Time Slot : </p>
        <p>{billData[6]} Hrs</p>
        <p>Total Persons : </p>
        <p>{billData[7]} </p>
        <p>Type : </p>
        <p>{billData[8]} </p>
      </div>
      {show ? (
        <p className="brand-logo f-16 text-center">Your Booking is today !!!</p>
      ) : null}
    </>
  );
};

export default OldBill;
