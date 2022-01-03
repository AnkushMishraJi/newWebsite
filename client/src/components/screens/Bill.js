import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Bill = () => {
  const payment_info = JSON.parse(localStorage.getItem("razor"));
  const isNightParty = localStorage.getItem("isNightParty");

  const User = localStorage.getItem("phone");
  const Hotel = localStorage.getItem("Hotel");
  const HotelEmail = localStorage.getItem("hotelEmail");
  const DateOfBooking = localStorage.getItem("bookingDate");
  const ArrivalTime = localStorage.getItem("time");
  const TotalPersons = localStorage.getItem("totalPersons");
  const girls = localStorage.getItem("girls");
  const BillingAmount = payment_info.amount / 100;
  const OrderId = payment_info.id;
  const PaymentTime = new Date(payment_info.created_at * 1000).toLocaleString();

  var time_slot;
  var type;
  var splitDate = DateOfBooking.split(" ");
  var displayDate = splitDate.splice(0, 4).join(" ");

  var splitTime = ArrivalTime.split(" ");
  var displayTime = splitTime.splice(3, 2).join(" ");

  if (isNightParty == true) {
    time_slot = 6;
    type = "Night party";
  } else {
    time_slot = 12;
    type = "Day Party";
  }

  useEffect(() => {
    fetch("/api/addConfirmBookingsUser", {
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
        HotelEmail,
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

    fetch("/api/booking", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: User,
        totalPersons: TotalPersons,
        girls,
        checkIn: ArrivalTime,
        slot: time_slot,
        hotelEmail: HotelEmail,
        roomtype: type,
        totalBill: BillingAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("booking created successfully!");
        }
      });
  }, []);

  return (
    <>
      <style>{"body { background-color: #1a1b41; }"}</style>
      <div className="brand-logo text-center mt-4 f-18 ">
        Payment Successful
      </div>
      <FontAwesomeIcon
        className="title_text mx-auto d-flex my-3"
        icon={faCheckCircle}
      />
      <p className="text-center brand-logo">Bill</p>
      <div className="bill text-light f-20">
        <div>
          <p className="f-12 font-weight-bolder">Hotel</p>
          <p>{Hotel}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Date of Arrival</p>
          <p>{displayDate}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Time of Arrival</p>
          <p>{displayTime}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Total Persons</p>
          <p>{TotalPersons}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Billing Amount</p>
          <p>Rs. {BillingAmount}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Order ID</p>
          <p>{OrderId}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Date and time of payment</p>
          <p>{PaymentTime}</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Time Slot</p>
          <p>{time_slot} Hrs</p>
        </div>
        <div>
          <p className="f-12 font-weight-bolder">Type</p>
          <p>{type}</p>
        </div>
      </div>
    </>
  );
};

export default Bill;
