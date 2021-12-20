import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Bill = () => {
  const payment_info = JSON.parse(localStorage.getItem("razor"));
  const isNightParty = localStorage.getItem("isNightParty");

  const User = "abc@abc.com";
  const Hotel = localStorage.getItem("Hotel");
  const DateOfBooking = localStorage.getItem("bookingDate");
  const ArrivalTime = localStorage.getItem("time");
  const TotalPersons = localStorage.getItem("totalPersons");
  const BillingAmount = payment_info.amount / 100;
  const OrderId = payment_info.id;
  const PaymentTime = new Date(payment_info.created_at * 1000).toLocaleString();

  var time_slot;
  var type;

  if (isNightParty == true) {
    time_slot = 6;
    type = "Night party";
  } else {
    time_slot = 12;
    type = "Day Party";
  }

  useEffect(() => {
    fetch("/addConfirmBookingsUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User,
        Hotel,
        DateOfBooking,
        ArrivalTime,
        TotalPersons,
        BillingAmount,
        OrderId,
        PaymentTime,
        TimeSlot: time_slot,
        Type: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Added Successfuly");
        }
      });
  }, []);

  return (
    <>
      <div>Payment Successful</div>
      <div>
        <p>Hotel : {Hotel}</p>
        <p>Date of Booking : {DateOfBooking}</p>
        <p>Time of Arrival : {ArrivalTime}</p>
        <p>Total Persons : {TotalPersons}</p>
        <p>Billing Amount : Rs. {BillingAmount}</p>
        <p>Order ID : {OrderId}</p>
        <p>Date and time of payment :{PaymentTime}</p>
        <p>Time Slot : {time_slot} Hrs</p>
        <p>Type : {type}</p>
      </div>
      <Link to="/allBookings">All Bookings</Link>
    </>
  );
};

export default Bill;
