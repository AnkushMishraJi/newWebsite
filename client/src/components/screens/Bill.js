import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { TabTitle } from "../TitleSetter";
import FooterDesktop from "../FooterDesktop";


window.onbeforeunload = function() { 
  if(window.location.pathname=="/bill"){
    window.setTimeout(function () { 
      window.location = '/';
  }, 0); 
  }
  
  window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
}

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;

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
  const addedSpeakerName = localStorage.getItem("speaker");
  const addedDecorTheme = localStorage.getItem("decoration_theme");
  const addedDecorTier = localStorage.getItem("decoration_tier");

  var time_slot;
  var type;
  var splitDate = DateOfBooking.split(" ");
  var displayDate = splitDate.splice(0, 4).join(" ");

  var splitTime = ArrivalTime.split(" ");
  var displayTime = splitTime.splice(4, 1).join(" ");

  TabTitle("Mera Adda | Receipt Generated");

  const [width, setWidth] = useState(0)

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
        DateOfBooking : displayDate,
        ArrivalTime : displayTime,
        TotalPersons,
        BillingAmount,
        OrderId,
        PaymentTime,
        TimeSlot: time_slot,
        Type: type,
        HotelEmail,
        Speaker: addedSpeakerName,
        Decoration: addedDecorTheme + " " + addedDecorTier,
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
    <div className={isMobile || width <= 980 ? null : 'w-40 mx-auto'}>
      <style>{"body { background-color: #1a1b41; }"}</style>
      <div className={`brand-logo text-center  ${isMobile || width <= 980 ? `f-18 mt-4` : `f-24 mt-0`}`}>
        Payment Successful
      </div>
      <FontAwesomeIcon
        className="title_text mx-auto d-flex my-3"
        icon={faCheckCircle}
      />
      <p className={`text-center brand-logo ${isMobile || width <= 980 ? null : `f-24`}`}>Bill</p>
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
       { addedSpeakerName != 'undefined' ?
        <div>
            <p className="f-12 font-weight-bolder">Speaker</p>
            <p>{addedSpeakerName}</p>
          </div>
          :
          null
        }
        { addedDecorTheme != 'undefined' ?
          <div>
          <p className="f-12 font-weight-bolder">Decoration</p>
          <p>{addedDecorTheme + " " + addedDecorTier}</p>
        </div>
        :
        null
      }
      </div>
    </div>
    {
      isMobile || width <= 980 ?
      null:
      <FooterDesktop />
    }
    </>
  );
};

export default Bill;
