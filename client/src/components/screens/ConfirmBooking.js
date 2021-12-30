import React, { useState, useEffect } from "react";
import "../../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import TimePicker from "@mui/lab/TimePicker";

const ConfirmBooking = () => {
  //   stringArray.map((date) => new Date(date));

  const [hotelName, setHotelName] = useState();
  const [address, setAddress] = useState();

  const [smallCap, setSmallCap] = useState();
  const [smallPrice, setSmallPrice] = useState();
  const [smallNightPrice, setSmallNightPrice] = useState();

  const [medCap, setMedCap] = useState();
  const [medPrice, setMedPrice] = useState();
  const [medNightPrice, setMedNightPrice] = useState();

  const [largeCap, setLargeCap] = useState();
  const [largePrice, setLargePrice] = useState();
  const [largeNightPrice, setLargeNightPrice] = useState();

  const [totalPersons, setTotalPersons] = useState();
  const [price, setPrice] = useState();
  const [isNightParty, setIsNightParty] = useState();

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [type, setType] = useState();
  const [room, setRoom] = useState();
  const [isBlockedOn, setIsBlockedOn] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setHotelName(localStorage.getItem("hotel"));
    setAddress(localStorage.getItem("address"));

    setSmallCap(localStorage.getItem("smallCap"));
    setSmallPrice(localStorage.getItem("smallPrice"));
    setSmallNightPrice(localStorage.getItem("smallNightPrice"));

    setMedCap(localStorage.getItem("medCap"));
    setMedPrice(localStorage.getItem("medPrice"));
    setMedNightPrice(localStorage.getItem("medNightPrice"));

    setLargeCap(localStorage.getItem("largeCap"));
    setLargePrice(localStorage.getItem("largePrice"));
    setLargeNightPrice(localStorage.getItem("largeNightPrice"));

    setIsNightParty(localStorage.getItem("isNightParty"));

    setTotalPersons(localStorage.getItem("totalPersons"));

    setDate(() => new Date(localStorage.getItem("bookingDate")));
    setIsBlockedOn(localStorage.getItem("isBlockedOn"));
    setTime(localStorage.getItem("time"));
    setRoom(localStorage.getItem("room"));
  }, []);

  useEffect(() => {
    if (count > 0) {
      partyType();
      amountAndRoom();
      personCheck();
      console.log(count);
      console.log(totalPersons);
      console.log(isNightParty);
      console.log(date);
    }
  }, [isNightParty, totalPersons]);

  useEffect(() => {}, [price, room]);

  useEffect(() => {}, [isBlockedOn]);

  const stringArray = isBlockedOn.split(",");
  const result = stringArray.map((date) => new Date(date));

  const partyType = () => {
    if (isNightParty == true) setType("Night Party");
    else setType("Day Party");
  };

  const amountAndRoom = () => {
    if (totalPersons <= smallCap && isNightParty && smallCap) {
      setPrice(smallPrice);
      setRoom("Small Room");
    } else if (totalPersons <= smallCap && isNightParty && smallCap) {
      setPrice(smallNightPrice);
      setRoom("Small Room");
    } else if (totalPersons <= medCap && isNightParty && medCap) {
      setPrice(medPrice);
      setRoom("Medium Room");
    } else if (totalPersons <= medCap && isNightParty && medCap) {
      setPrice(medNightPrice);
      setRoom("Medium Room");
    } else if (totalPersons <= largeCap && isNightParty && largeCap) {
      setPrice(largePrice);
      setRoom("Large Room");
    } else if (totalPersons <= largeCap && isNightParty && largeCap) {
      setPrice(largeNightPrice);
      setRoom("Large Room");
    }
  };

  const personCheck = () => {
    if (totalPersons < 1) {
      setTotalPersons(1);
    } else if (
      totalPersons > smallCap &&
      totalPersons > medCap &&
      totalPersons > largeCap
    ) {
      if (largeCap) setTotalPersons(largeCap);
      else if (medCap) setTotalPersons(medCap);
      else setTotalPersons(smallCap);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center p-5"
      style={{ backgroundColor: "#1a1b41", height: "100%", height: "90vh" }}
    >
      <p className="text-light f-24">Confirm Booking?</p>
      <h5 className="title_text font-weight-bolder f-32 mb-0 brand-logo">
        {hotelName}
      </h5>
      <h1 className="text-light font-weight-bolder f-18 brand-logo">
        {address}
      </h1>

      <div className="container-input">
        <DatePicker
          className="px-3"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MMM-yyyy"
          minDate={new Date()}
          excludeDates={result}
        />
      </div>
      <div className="container-input">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            selected={time}
            value={time}
            onChange={(time) => {
              setTime(time);
            }}
            renderInput={(params) => (
              <TextField
                className="text-center inside-box"
                style={{ border: "none" }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className="w-70 d-inline-flex mt-3">
        <p className="p-0 mt-2 mb-0 text-light f-14 w-100 ">Total Persons</p>
        <input
          style={{ border: "none", height: "25px", width: "60px" }}
          className="p-0 mt-2 f-12 text-center bg-light"
          type="number"
          value={totalPersons}
          onChange={(e) => {
            setTotalPersons(parseInt(e.target.value));
            setCount(count + 1);
          }}
          min="1"
          max="50"
        />
      </div>
      <div className="text-light text-center mt-5">
        <p>Girls and Boys not allowed together at this venue</p>
      </div>
      <div className="confirm-page text-light w-80 mt-5 f-18">
        <p>Total Persons</p>
        <p className="right-text">{totalPersons}</p>
        <p>Type</p>
        <p className="right-text">{type}</p>
        <p>Room</p>
        <p className="right-text">{room}</p>
        <p>Amount</p>
        <p className="right-text">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ConfirmBooking;
