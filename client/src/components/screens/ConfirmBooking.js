import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Carousel } from "react-responsive-carousel";


import TimePicker from "@mui/lab/TimePicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimesCircle, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

const shortid = require("shortid");

const ConfirmBooking = () => {
  //   stringArray.map((date) => new Date(date));

  const isMounted = useRef(false);
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");

  const [smallCap, setSmallCap] = useState("");
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
  const [isNightParty, setIsNightParty] = useState(true);

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [type, setType] = useState("");
  const [room, setRoom] = useState("");
  const [isBlockedOn, setIsBlockedOn] = useState("");
  const [count, setCount] = useState(0);
  const [route, setRoute] = useState("");
  const [back, setBack] = useState("");
  const [firstPrice, setFirstPrice] = useState("")
  const [showDecorCarousel, setShowDecorCarousel]= useState(false);
  const [showSpeakerCarousel, setShowSpeakerCarousel]= useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const [speakers, setSpeakers] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [addedCost, setAddedCost] = useState(0);
  const [addedDecorCost, setAddedDecorCost] = useState(0);
  const [addedSpeakerCost, setAddedSpeakerCost] = useState(0);

  var currTime= new Date();
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
    
    // const localPrice = localStorage.getItem("price");
    // const localNightPrice = localStorage.getItem("nightPrice");
    // firstprice(localPrice, localNightPrice);
    localStorage.setItem("route", "/confirmBooking");
  }, []);

  // useEffect(() => {}, [price, room, ]);



  useEffect(()=>{
    fetch("/api/getSpeakers")
    .then((res)=>res.json())
    .then((data)=>setSpeakers(data))
    .catch((err)=>{

    });


    fetch("/api/getDecorations")
    .then((res)=>res.json())
    .then((data)=>setDecorations(data))
    .catch((err)=>{

    });
  },[])

  useEffect(() => {
    if (count > 0) {
      amountAndRoom();
    }
    else{
      if(isNightParty==="true")
      setFirstPrice(localStorage.getItem("nightPrice"));
      else if(isNightParty==="false")
      setFirstPrice(localStorage.getItem("price"));
    }

    console.log(firstPrice,"first price")
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

  // const firstprice = (localPrice, localNightPrice) => {
  //   if (type=="Day Party") 
  //   setPrice(localPrice);
  //   else setPrice(localNightPrice);

  //   console.log(price,isNightParty);
  // };

  const amountAndRoom = () => {
    console.log("amount running");
    console.log(isNightParty);
    console.log(totalPersons);
    if (totalPersons <= smallCap && isNightParty && parseInt(smallCap)) {
      setPrice(smallNightPrice);
      setRoom("Small room");
    } else if (totalPersons <= smallCap && !isNightParty && parseInt(smallCap)) {
      setPrice(smallPrice);
      setRoom("Small room");
    } else if (totalPersons <= medCap && isNightParty && parseInt(medCap)) {
      setPrice(medNightPrice);
      setRoom("Medium room");
    } else if (totalPersons <= medCap && !isNightParty && parseInt(medCap)) {
      setPrice(medPrice);
      setRoom("Medium room");
    } else if (totalPersons <= largeCap && isNightParty && parseInt(largeCap)) {
      setPrice(largeNightPrice);
      setRoom("Large room");
    } else if (totalPersons <= largeCap && !isNightParty && parseInt(largeCap)) {
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

  const liveRzpKey="rzp_live_S03VwKfzlY7FmS";
  const testRzpKey="rzp_test_ZwIQoXjws19gWq";
  async function displayRazorpay() {
    // console.log("rzp Running");

    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        amount: (count == 0 ? firstPrice : price) * 100,
        currency: "INR",
        payment_capture: 1,
        receipt: shortid.generate(),
      }),
    }).then((res) => res.json());
    console.log(data);
    localStorage.setItem("Hotel", hotelName);
 
    const options = {
      key: liveRzpKey, // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Hasen Enterprises",
      description: "Transaction",
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
        name: "Hasen Enterprises",
        email: "meraaddacontact@gmail.com",
        contact: "9569736905",
      },
      notes: {
        address: "Lucknow",
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
    <>
    <div className="d-flex flex-column align-items-center p-5 bg-brand" style={showDecorCarousel || showSpeakerCarousel ? {filter:"blur(8px)"} : null}> 
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
              className="timepicker bg-light w-70 mt-2"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
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
      <div className={showDecorCarousel||showSpeakerCarousel ? "text-light text-center w-100" : "text-light text-center w-75"}>
        <p className="font-weight-bolder f-18">Customise</p>
        <div>
          <div className="d-flex justify-content-between mb-3">
          <p className="font-weight-bolder">Decoration</p>
          <div className="font-weight-bolder" >
            {
              addedDecorCost==0 ?
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#fe9124", borderRadius:"50%", color:"#1a1b41"}}
                icon={faPlusCircle}
                onClick={()=>setShowDecorCarousel(true)}
              />
              :
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#fe9124", borderRadius:"50%", color:"#1a1b41"}}
                icon={faMinusCircle}
                onClick={()=>setAddedDecorCost(0)}
              />
            }
        </div>
          </div>
          <div className="d-flex justify-content-between">
          <p className="font-weight-bolder">Speaker</p>
          <div className="font-weight-bolder">
          {
              addedSpeakerCost==0 ?
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#fe9124", borderRadius:"50%", color:"#1a1b41"}}
                icon={faPlusCircle}
                onClick={()=>setShowSpeakerCarousel(true)}
              />
              :
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#fe9124", borderRadius:"50%", color:"#1a1b41"}}
                icon={faMinusCircle}
                onClick={()=>setAddedSpeakerCost(0)}
              />
            }
          </div>
          </div>
        </div>
      </div>
      <div className="confirm-page text-light  w-63 f-16 mt-4">
        <p className="font-weight-bolder">Total Persons</p>
        <p className="right-text">{totalPersons}</p>
        <p className="font-weight-bolder">Type</p>
        <p className="right-text">{type}</p>
        <p className="font-weight-bolder">Room</p>
        <p className="right-text">{room}</p>
        <p className="font-weight-bolder">Amount</p>
        <p className="right-text">Rs. {count==0 ? parseInt(firstPrice)+addedDecorCost+addedSpeakerCost : price+addedDecorCost+addedSpeakerCost}</p>
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
      <p className="text-light mb-10">By clicking on Pay Now you agree to our terms and conditions policy.<span style={{textDecoration:"underline", color:"orange"}}> <a href="/guest_policy.docx" >Click here</a> </span>to download.</p>
    </div>
    <div className="w-100" style={{position:"absolute", top:"30%"}}>
      <div className={showDecorCarousel || showSpeakerCarousel ? "text-light" : "d-none"} style={{position:"absolute", left:"90%", zIndex:"1"}} onClick={()=>{setShowDecorCarousel(false); setShowSpeakerCarousel(false);}}>
        <FontAwesomeIcon
          className="f-32"
          style={{background:"red", borderRadius:"50%", color:"#1a1b41"}}
          icon={faTimesCircle}
        />
        </div>
    {
          showDecorCarousel ?
          <Carousel
          dynamicHeight={false}
          showThumbs={false}
          infiniteLoop={false}
          showIndicators={false}
          showStatus={false}
          className="mb-5"
          swipeScrollTolerance={50}
          preventMovementUntilSwipeScrollTolerance={true}
          centerMode={true}
          centerSlidePercentage={80}
          showArrows={true}
        >
          {
            decorations.map((decoration)=>{
              
              let id = decoration.decoration_theme.replaceAll(" ","-");
              id=id + "-" + decoration.decoration_tier;
              console.log(id);
              return(
                <div onClick={()=>{setShowDecorCarousel(false);setAddedDecorCost(decoration.price)}} key={decoration._id} className="benefits-custom-selectpage" id={id}>
                  <div className="tape w-50 py-5">
                  <p className="font-weight-bolder f-18">{decoration.decoration_theme.charAt(0).toUpperCase()+decoration.decoration_theme.slice(1)}</p>
                  <p className="font-weight-bolder f-16">{decoration.decoration_tier}</p>
                  {/* <p className="f-14 my-auto text-start px-2">100 Baloons</p>
                  <p className="f-14 my-auto text-start px-2">1 Love Foil</p>
                  <p className="f-14 my-auto text-start px-2">2 Foil Baloons</p>
                  <p className="f-14 my-auto text-start px-2">12 Candles LED</p> */}
                  <p className="font-weight-bolder f-18">₹ {decoration.price}</p>
                  </div>
                </div>
              )
            })
          }
        </Carousel>
        :
        showSpeakerCarousel ?
        <Carousel
        dynamicHeight={false}
        showThumbs={false}
        infiniteLoop={false}
        showIndicators={false}
        showStatus={false}
        className="mb-5"
        swipeScrollTolerance={50}
        preventMovementUntilSwipeScrollTolerance={true}
        centerMode={true}
        centerSlidePercentage={80}
        showArrows={false}
      >
        {
        speakers.map((speaker)=>{
          let id = speaker.speaker_name;
          return(
            <div key={speaker._id} onClick={()=>{setShowSpeakerCarousel(false);setAddedSpeakerCost(speaker.speaker_price)}} className="benefits-custom-selectpage" id={id}>
              <div className="tape w-40 py-5">
              <p className="font-weight-bolder f-16">{speaker.speaker_name.toUpperCase()}</p>
              <p className="font-weight-bolder f-16">{speaker.speaker_price == 0 ? "FREE" : `₹ ${speaker.speaker_price}`}</p>
            </div>
            </div>
            )
        })
        }

        </Carousel>
        :
        null
      }
    </div>
    </>
  );
};

export default ConfirmBooking;
