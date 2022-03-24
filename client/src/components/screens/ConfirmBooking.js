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
import { faArrowLeft, faTimesCircle, faPlusCircle, faMinusCircle, faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import FooterDesktop from "../FooterDesktop";
import { TabTitle } from "../TitleSetter";
import LayoutHeader from "../LayoutHeader";
import LayoutMobile from "../LayoutMobile";

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;
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

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [type, setType] = useState("");
  const [room, setRoom] = useState("");
  const [isBlockedOn, setIsBlockedOn] = useState("");
  const [count, setCount] = useState(0);
  const [route, setRoute] = useState("");
  const [back, setBack] = useState(localStorage.getItem("back"));
  const [firstPrice, setFirstPrice] = useState("")
  const [showDecorCarousel, setShowDecorCarousel]= useState(false);
  const [showSpeakerCarousel, setShowSpeakerCarousel]= useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const [speakers, setSpeakers] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [addedCost, setAddedCost] = useState(0);
  const [addedDecorCost, setAddedDecorCost] = useState(0);
  const [addedSpeakerCost, setAddedSpeakerCost] = useState(0);
  const [width, setWidth] = useState(0)
  const [addedDecorTheme,setAddedDecorTheme] = useState();
  const [addedDecorTier,setAddedDecorTier] = useState();
  const [addedSpeakerName, setAddedSpeakerName] = useState();
  const [coupons, setCoupons] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [havePromoCode, setHavePromoCode] = useState(false);
  const [input_coupon, setInputCoupon] = useState("");
  const [promoCodeTried, setPromoCodeTried] = useState(false);
  const [promoFlatDiscount, setPromoFlatDiscount] = useState(0)
  const [promoPercentDiscount, setPromoPercentDiscount] = useState(0)


  var currTime= new Date();
  const history = useHistory();

  TabTitle("Mera Adda | Confirm Booking");

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

    fetch(`/api/getVoucher${back}`)
    .then((res)=>res.json())
    .then((data)=>{
      setCoupons(data)
      }
    )
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




  const renderPromoCode = ()=>{
    
    return(
      <>
        {
          havePromoCode ?
          <div className={`bg-light ${isMobile || width <= 980 ? `w-80` : `w-70`}`}>
              <div className='d-flex align-items-center justify-content-between px-2 bg-brand'>
                <input className="container-input w-60" placeholder="Enter Coupon Code" onChange={(e)=>setInputCoupon(e.target.value)}/>
                <button className='user-page-btn bg-orange font-weight-bolder px-2 py-2 my-1' style={{color: "white"}} onClick={()=>{setPromoCodeTried(true);setHavePromoCode(false);calculateDiscount()}}>Submit</button>
              </div>
          </div>
          :
          promoCodeTried && coupons.some(coupon => coupon['coupon_code'].toUpperCase()==input_coupon.toUpperCase()) ? 
          <div className='d-flex align-items-center justfy-content-between mt-2'>
            <p className='f-16 px-2 text-light font-weight-bolder'>Coupon Applied</p>
            <div className='d-flex w-50'>
            <p className='f-16 title_text px-2 font-weight-bolder'>{input_coupon.toUpperCase()}</p>
            <FontAwesomeIcon onClick={()=>{setPromoCodeTried(false);setPromoFlatDiscount(0);setPromoPercentDiscount(0);setInputCoupon("")}}  className="waves-effect text-light mt-1" icon={faTrash}/>
            </div>
          </div>
          :
          promoCodeTried ?
          <p className='f-16 text-light'>Invalid Code <span className='discount title_text'  style={{textDecoration:'underline'}} onClick={()=>{setHavePromoCode(true);}}>Try Again</span></p>
          :
          <p className='f-16 title_text discount' style={{textDecoration:'underline'}} onClick={()=>{setHavePromoCode(true)}}>Have a Promo Code?</p>
        }
      </>
    )
  }

  const calculateDiscount = async ()=>{
    for(let i=0;i<coupons.length;i=i+1){
      if(coupons[i].coupon_code.toUpperCase()==input_coupon.toUpperCase()){
        if(coupons[i].flat_discount){
          setPromoFlatDiscount(parseInt(coupons[i].flat_discount));
          Swal.fire({
            icon: "success",
            title: `Coupon Applied - ${input_coupon.toUpperCase()}`,
            text: `₹ ${coupons[i].flat_discount} OFF`,
            confirmButtonColor: "#FF3030",
            allowEnterKey: false,
          });
        }
        else{
          setPromoPercentDiscount(parseInt(coupons[i].percent_discount))
          Swal.fire({
            icon: "success",
            title: `Coupon Applied - ${input_coupon.toUpperCase()}`,
            text: `${coupons[i].percent_discount}% OFF`,
            confirmButtonColor: "#FF3030",
            allowEnterKey: false,
          });
        }
      }
    }
  }

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

  const displayAmount = (payMethod)=>{
    let amount=0;
    if(payMethod=="service" && count == 0){
      amount=parseInt(firstPrice)/10+addedDecorCost+addedSpeakerCost;
      localStorage.setItem("CollectAmountHotel",parseInt(firstPrice))
    }
    else if(payMethod=="service" && count != 0){
      amount=parseInt(price)/10+addedDecorCost+addedSpeakerCost;
      localStorage.setItem("CollectAmountHotel",parseInt(price))
    }
    else if(payMethod=="complete" && count == 0){
      amount=parseInt((firstPrice*(100-promoPercentDiscount)/100))+addedDecorCost+addedSpeakerCost-promoFlatDiscount+firstPrice/10;
      localStorage.setItem("CollectAmountHotel","0")
    }
    else{
      amount=parseInt((price*(100-promoPercentDiscount)/100))+addedDecorCost+addedSpeakerCost-promoFlatDiscount+price/10;
      localStorage.setItem("CollectAmountHotel","0")
    }

    return amount;
  }

  async function displayRazorpay(payMethod) {
    // console.log("rzp Running");
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        amount: displayAmount(payMethod) * 100,
        currency: "INR",
        payment_capture: 1,
        receipt: shortid.generate(),
      }),
    }).then((res) => res.json());
    console.log(data);
    localStorage.setItem("Hotel", hotelName);
    localStorage.setItem("decoration_theme",addedDecorTheme);
    localStorage.setItem("decoration_tier",addedDecorTier);
    localStorage.setItem("speaker",addedSpeakerName);
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
          confirmButtonColor: "#FF3030",
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

  const handleSelectDecor = (decoration)=>{
    setShowDecorCarousel(false);
    setAddedDecorCost(decoration.price);
    setAddedDecorTheme(decoration.decoration_theme.charAt(0).toUpperCase()+decoration.decoration_theme.slice(1));
    setAddedDecorTier(decoration.decoration_tier);
    
  }

  const handleSelectSpeaker = (speaker)=>{
    setShowSpeakerCarousel(false);
    setAddedSpeakerCost(speaker.speaker_price);
    setAddedSpeakerName(speaker.speaker_name.toUpperCase());
    
  }

  const openPaymentModal = ()=>{
    return(
      <div className={`${isMobile || width <= 980 ?`w-70`:`w-25`} mx-auto`} style={{marginTop:"10%"}} >
      <div className={`${isMobile || width <= 980 ?`w-70`:`w-25`} bg-light p-4`} style={{position:"absolute",borderRadius:"10px"}}>
        <div className='d-flex justify-content-between'>
          <p className='font-weight-bolder f-16'>Payment Method</p>
          <FontAwesomeIcon
            className="f-32"
            style={{background:"black", borderRadius:"50%", color:"white"}}
            icon={faTimesCircle}
            onClick={()=>{setShowPaymentModal(false)}}
          />
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <div>
            <p className='f-16 line-ht-0'>Reserve for Rs {displayAmount("service")}</p>
            <p className='f-14 line-ht-0'>& Pay rest at Hotel</p>
          </div>
          <button className="text-light px-5 font-weight-bolder"
              style={{
                backgroundColor: "#FF3030",
                borderRadius: "8px",
                border: "none",
              }}
              onClick={() => {
                isAuthenticated ? displayRazorpay("service") : history.push("/usignin");
              }}
            >
              <FontAwesomeIcon
              className="f-22"
              style={{background:"#FF3030", color:"white"}}
              icon={faArrowRight}
              />
            </button>
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <div>
          <p className='f-16 line-ht-0'>Pay full in advance</p>
          <p className='f-16 line-ht-0'>Rs {displayAmount("complete")}</p>
          </div>
          <button className="text-light px-5 font-weight-bolder"
              style={{
                backgroundColor: "black",
                borderRadius: "8px",
                border: "none",
              }}
              onClick={() => {
                isAuthenticated ? displayRazorpay("complete") : history.push("/usignin");
              }}
            >
              <FontAwesomeIcon
              className="f-22"
              style={{background:"black", color:"white"}}
              icon={faArrowRight}
              />
            </button>
        </div>
      </div>
      </div>
    )
  }

  return (
    <>
    {isMobile || width <= 980 ? null : <LayoutHeader />}
    <div className={`d-flex flex-column align-items-center p-5 bg-brand mt-2 ${isMobile || width <= 980 ? null : `w-40 mx-auto`}`} 
    style={showDecorCarousel || showSpeakerCarousel || showPaymentModal ? {filter:"blur(8px)"} : null}
    onClick={()=>{if(showDecorCarousel || showSpeakerCarousel || showPaymentModal){setShowDecorCarousel(false);setShowSpeakerCarousel(false);setShowPaymentModal(false)}}}
    > 
      <p className="text-light f-18">Confirm Booking?</p>
      {
        isMobile || width <= 980 ?
        <Link to={back}>
        <FontAwesomeIcon
          className="back-arrow waves-effect"
          icon={faArrowLeft}
        />
      </Link>
      :
      null
      }
     
      <h5 className="title_text font-weight-bolder f-18 mb-0 brand-logo">
        {hotelName}
      </h5>
      <h1 className="text-light font-weight-bolder f-16 brand-logo">
        {address}
      </h1>

      <div className="container-input mt-3 w-70">
        <DatePicker
          className="px-3"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MMM-yyyy"
          minDate={currTime.getHours()>20 ? new Date(currTime.getFullYear(),currTime.getMonth(),currTime.getDate()+1):new Date()}
          excludeDates={result}
          ref={(el) => onDatepickerRef(el)}
        />
      </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            selected={time}
            value={time.getHours()==currTime.getHours() && currTime.getHours()>=6 && currTime.getHours()<20 ? new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes()) : time.getHours()==currTime.getHours() && ( currTime.getHours()<6 || currTime.getHours()>20 ) ? new Date(0,0,0,10,0) : time}
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
            minTime={currTime.getDate() == date.getDate() && currTime.getHours()>=6 ?  new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes()) : new Date(0,0,0,10,0)}
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
          {
            addedDecorCost==0 ?
            null
            :
            <div className='f-12 line-ht-0 my-auto'>
              <p>{addedDecorTheme}</p>
              <p>{addedDecorTier}</p>
            </div>
          }
          <div className="font-weight-bolder" >
            {
              addedDecorCost==0 ?
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faPlusCircle}
                onClick={()=>setShowDecorCarousel(true)}
              />
              :
              <div className='d-flex'>
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faMinusCircle}
                onClick={()=>{setAddedDecorCost(0);setAddedDecorTheme('');setAddedDecorTier('');}}
              />
              </div>
            }
        </div>
          </div>
          <div className="d-flex justify-content-between">
          <p className="font-weight-bolder">Speaker</p>
          {
            !addedSpeakerName ?
            null
            :
            <div className='f-12 line-ht-0 my-auto'>
              <p>Speaker added</p>
              <p>{addedSpeakerName}</p>
            </div>
          }
          <div className="font-weight-bolder">
          {
              !addedSpeakerName ?
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faPlusCircle}
                onClick={()=>setShowSpeakerCarousel(true)}
              />
              :
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faMinusCircle}
                onClick={()=>{setAddedSpeakerCost(0); setAddedSpeakerName('')}}
              />
            }
          </div>
          </div>
        </div>
      </div>
      {/* { 
        isMobile || width <= 980 ?
        <div className={showDecorCarousel||showSpeakerCarousel ? "text-light text-center w-100" : "text-light text-center w-75"}>
        <p className="font-weight-bolder f-18">Customise</p>
        <div>
          <div className="d-flex justify-content-between mb-3">
          <p className="font-weight-bolder">Decoration</p>
          {
            addedDecorCost==0 ?
            null
            :
            <div className='f-12 line-ht-0 my-auto'>
              <p>{addedDecorTheme}</p>
              <p>{addedDecorTier}</p>
            </div>
          }
          <div className="font-weight-bolder" >
            {
              addedDecorCost==0 ?
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faPlusCircle}
                onClick={()=>setShowDecorCarousel(true)}
              />
              :
              <div className='d-flex'>
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faMinusCircle}
                onClick={()=>{setAddedDecorCost(0);setAddedDecorTheme('');setAddedDecorTier('');}}
              />
              </div>
            }
        </div>
          </div>
          <div className="d-flex justify-content-between">
          <p className="font-weight-bolder">Speaker</p>
          {
            !addedSpeakerName ?
            null
            :
            <div className='f-12 line-ht-0 my-auto'>
              <p>Speaker added</p>
              <p>{addedSpeakerName}</p>
            </div>
          }
          <div className="font-weight-bolder">
          {
              !addedSpeakerName ?
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faPlusCircle}
                onClick={()=>setShowSpeakerCarousel(true)}
              />
              :
              <FontAwesomeIcon
                className="f-32"
                style={{background:"#FF3030", borderRadius:"50%", color:"black"}}
                icon={faMinusCircle}
                onClick={()=>{setAddedSpeakerCost(0); setAddedSpeakerName('')}}
              />
            }
          </div>
          </div>
        </div>
      </div>
      :
      null
    } */}
    
    {renderPromoCode()}

      <div className={`confirm-page text-light ${isMobile || width <= 980 ? `w-63` : `w-60`} f-16 mt-4`}>
        <p className="font-weight-bolder">Total Persons</p>
        <p className="right-text">{totalPersons}</p>
        <p className="font-weight-bolder">Type</p>
        <p className="right-text">{type}</p>
        <p className="font-weight-bolder">Room</p>
        <p className="right-text">{room}</p>
        <p className="font-weight-bolder">Amount</p>
        <p className="right-text">Rs. {displayAmount("complete")}</p>
      </div>
      <button
        onClick={() => {
          // isAuthenticated ? displayRazorpay() : history.push("/usignin");
          setShowPaymentModal(true)
        }}
        className="text-light w-40 mt-3 "
        style={{
          position: "relative",
          backgroundColor: "#FF3030",
          height: "40px",
          borderRadius: "18px",
          border: "none",
          bottom: "2.5em",
          right: "0em",
        }}
      >
        Pay now
      </button>
      <p className={isMobile || width <= 980 ? `text-light mb-10` :`text-light mb-10 w-60`}>By clicking on Pay Now you agree to our terms and conditions policy.<span style={{textDecoration:"underline", color:"orange"}}> <a href="/policies.docx" >Click here</a> </span>to download.</p>
    </div>
    <div className={`w-100`} style={{position:"absolute", top:"30%"}}>
      <div className={showDecorCarousel || showSpeakerCarousel ? "text-light" : "d-none"} style={isMobile || width <= 980 ? {position:"absolute", top:"-90%", left:"90%", zIndex:"1"} : {position:"absolute", top:"-30%", left:"95%"}} onClick={()=>{setShowDecorCarousel(false); setShowSpeakerCarousel(false);}}>
        <FontAwesomeIcon
          className="f-32 pointer"
          style={{background:"red", borderRadius:"50%", color:"white"}}
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
          className="mb-5 pointer" 
          swipeScrollTolerance={50}
          preventMovementUntilSwipeScrollTolerance={true}
          centerMode={true}
          centerSlidePercentage={isMobile || width <= 980 ? 80 : 65}
          showArrows={true}
        >
          {
            decorations.map((decoration)=>{
              let id = decoration.decoration_theme.replaceAll(" ","-");
              id=id + "-" + decoration.decoration_tier;
              console.log(id);
              return(
                <div onClick={()=>handleSelectDecor(decoration)} key={decoration._id} className={`benefits-custom-selectpage ${isMobile || width <= 980 ? null : `w-50`}`} id={id} style={isMobile || width <= 980 ? null : {height:'350px'}}>
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
        className="mb-5 pointer" style={{width: "70%", height: "30%"}}
        swipeScrollTolerance={50}
        preventMovementUntilSwipeScrollTolerance={true}
        centerMode={true}
        centerSlidePercentage={isMobile || width <= 980 ? 80 : 65}
        showArrows={true}
      >
        {
        speakers.map((speaker)=>{
          let id = speaker.speaker_name;
          return(
            <div key={speaker._id} onClick={()=>handleSelectSpeaker(speaker)} className={`benefits-custom-selectpage ${isMobile || width <= 980 ? null : `w-50`}`} id={id} style={isMobile || width <= 980 ? null : {height:'350px'}}>
              <div className="tape w-40 py-5" >
              <p className="font-weight-bolder f-16">{speaker.speaker_name.toUpperCase()}</p>
              <p className="font-weight-bolder f-16">{speaker.speaker_price == 0 ? "FREE" : `₹ ${speaker.speaker_price}`}</p>
            </div>
            </div>
            )
        })
        }

        </Carousel>
        :
        showPaymentModal ?
        openPaymentModal()
        :
        null
      }
    </div>
    {
      isMobile || width <= 980 ?
      <LayoutMobile />:
      <FooterDesktop />
    }
    </>
  );
};

export default ConfirmBooking;
