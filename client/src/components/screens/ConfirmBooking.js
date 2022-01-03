import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import TimePicker from "@mui/lab/TimePicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

const shortid = require("shortid");

const ConfirmBooking = () => {
  //   stringArray.map((date) => new Date(date));

  const isMounted = useRef(false);
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");

  const [smallCap, setSmallCap] = useState();
  const [smallPrice, setSmallPrice] = useState("");
  const [smallNightPrice, setSmallNightPrice] = useState("");

  const [medCap, setMedCap] = useState();
  const [medPrice, setMedPrice] = useState("");
  const [medNightPrice, setMedNightPrice] = useState("");

  const [largeCap, setLargeCap] = useState();
  const [largePrice, setLargePrice] = useState("");
  const [largeNightPrice, setLargeNightPrice] = useState("");

  const [totalPersons, setTotalPersons] = useState("");
  const [price, setPrice] = useState("");
  const [isNightParty, setIsNightParty] = useState("");

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [type, setType] = useState("");
  const [room, setRoom] = useState("");
  const [isBlockedOn, setIsBlockedOn] = useState("");
  const [count, setCount] = useState(0);
  const [route, setRoute] = useState("");
  const [back, setBack] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const history = useHistory();

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
    setTime(() => new Date(localStorage.getItem("time")));
    setRoom(localStorage.getItem("room"));
    setType(localStorage.getItem("type"));
    setRoute(localStorage.getItem("route"));
    setBack(localStorage.getItem("back"));
    let localPrice = localStorage.getItem("price");
    let localNightPrice = localStorage.getItem("nightPrice");
    firstprice(localPrice, localNightPrice);
    localStorage.setItem("route", "/confirmBooking");
  }, []);

  // useEffect(() => {}, [price, room, ]);

  useEffect(() => {
    if (count > 0) {
      amountAndRoom();
    }
  }, [totalPersons, isNightParty]);

  useEffect(() => {
    if (count > 0) {
      partyType();
      amountAndRoom();
    }
  }, [time]);

  useEffect(() => {
    if (count > 0) personCheck();
  }, [totalPersons]);

  const stringArray = isBlockedOn.split(",");
  const result = stringArray.map((date) => new Date(date));

  const partyType = () => {
    if (time.getHours() >= 18 || time.getHours() < 8) {
      setIsNightParty(true);
      setType("Night Party");
    } else {
      setIsNightParty(false);
      setType("Day Party");
    }
  };

  const firstprice = (localPrice, localNightPrice) => {
    if (isNightParty) setPrice(localPrice);
    else setPrice(localNightPrice);
  };

  const amountAndRoom = () => {
    console.log("amount running");
    console.log(isNightParty);
    console.log(totalPersons);

    if (totalPersons <= smallCap && isNightParty && smallCap) {
      setPrice(smallNightPrice);
      setRoom("Small room");
    } else if (totalPersons <= smallCap && !isNightParty && smallCap) {
      setPrice(smallPrice);
      setRoom("Small room");
    } else if (totalPersons <= medCap && isNightParty && medCap) {
      setPrice(medNightPrice);
      setRoom("Medium room");
    } else if (totalPersons <= medCap && !isNightParty && medCap) {
      setPrice(medPrice);
      setRoom("Medium room");
    } else if (totalPersons <= largeCap && isNightParty && largeCap) {
      setPrice(largeNightPrice);
      setRoom("Large room");
    } else if (totalPersons <= largeCap && !isNightParty && largeCap) {
      setPrice(largePrice);
      setRoom("Large room");
    }
  };

  const personCheck = () => {
    const arr = [];
    if (medCap > 0) arr.push(medCap);
    if (smallCap > 0) arr.push(smallCap);
    if (largeCap > 0) arr.push(largeCap);
    const maxPersons = Math.max(...arr);
    console.log(maxPersons, arr);
    if (totalPersons < 1 || totalPersons > 50) {
      setTotalPersons(1);
    } else if (totalPersons > maxPersons) {
      if (largeCap > 0) setTotalPersons(largeCap);
      else if (medCap > 0) setTotalPersons(medCap);
      else setTotalPersons(smallCap);
    }
  };

  async function displayRazorpay() {
    // console.log("rzp Running");

    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        amount: price * 100,
        currency: "INR",
        payment_capture: 1,
        receipt: shortid.generate(),
      }),
    }).then((res) => res.json());
    console.log(data);
    localStorage.setItem("Hotel", hotelName);

    const options = {
      key: "rzp_test_ZwIQoXjws19gWq", // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      created_at: data.created_at,
      handler: function (response) {
        Swal.fire({
          icon: "success",
          title: "Payment Success",
          text: "Your booking has been confirmed",
          confirmButtonColor: "#fe9124",
          allowEnterKey: false,
        });
        // console.log(JSON.stringify(response));
        history.push("/bill");
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    localStorage.setItem("razor", JSON.stringify(data));
  }

  const onDatepickerRef = (el) => {
    if (el && el.input) {
      el.input.readOnly = true;
    }
  };

  const closeKeyboard = (event) => {
    if (event.key == "Enter") {
      console.log("Enter");
      document.getElementById("tp").blur();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-5 bg-brand">
      <p className="text-light f-18">Confirm Booking?</p>
      <Link to={back}>
        <FontAwesomeIcon
          className="back-arrow waves-effect"
          icon={faArrowLeft}
        />
      </Link>
      <h5 className="title_text font-weight-bolder f-18 mb-0 brand-logo">
        {hotelName}
      </h5>
      <h1 className="text-light font-weight-bolder f-16 brand-logo">
        {address}
      </h1>

      <div className="container-input mt-3">
        <DatePicker
          className="px-3"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MMM-yyyy"
          minDate={new Date()}
          excludeDates={result}
          ref={(el) => onDatepickerRef(el)}
        />
      </div>
      <div className="container-input mt-3">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            selected={time}
            value={time}
            onChange={(time) => {
              setTime(time);
              setCount(count + 1);
            }}
            renderInput={(params) => (
              <TextField
                className="text-center  "
                style={{ border: "none", paddingLeft: "1em" }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </div>
      <div className="w-70 d-inline-flex mt-3">
        <p className="pt-3  mb-0 text-light f-15 w-100 ">Total Persons</p>
        <input
          id="tp"
          className="tp-box"
          type="number"
          value={totalPersons}
          onChange={(e) => {
            setTotalPersons(parseInt(e.target.value));
            setCount(count + 1);
          }}
          min="1"
          max="50"
          onKeyPress={closeKeyboard}
        />
      </div>
      <div className="text-light text-center">
        <p></p>
      </div>
      <div className="confirm-page text-light  w-63 f-16">
        <p className="font-weight-bolder">Total Persons</p>
        <p className="right-text">{totalPersons}</p>
        <p className="font-weight-bolder">Type</p>
        <p className="right-text">{type}</p>
        <p className="font-weight-bolder">Room</p>
        <p className="right-text">{room}</p>
        <p className="font-weight-bolder">Amount</p>
        <p className="right-text">Rs. {price}</p>
      </div>
      <button
        onClick={() => {
          isAuthenticated ? displayRazorpay() : history.push("/usignin");
        }}
        className="text-light w-40 mt-3 "
        style={{
          position: "relative",
          backgroundColor: "#fe9124",
          height: "40px",
          borderRadius: "18px",
          border: "none",
          bottom: "2.5em",
          right: "0em",
        }}
      >
        Pay now
      </button>
      <p className="mt-5">.</p>
    </div>
  );
};

export default ConfirmBooking;
