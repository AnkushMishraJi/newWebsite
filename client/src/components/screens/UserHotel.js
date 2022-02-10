import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import M from "materialize-css";
import CarouselContainer from "../CarouselContainer";
import { Row, Col } from "react-bootstrap";
import { TabTitle } from "../TitleSetter";

import {
  faCheckCircle,
  faArrowLeft,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterDesktop from "../FooterDesktop";

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;

const shortid = require("shortid");

const UserHotel = () => {
  const [hotelName, setHotelName] = useState();
  const [address, setAddress] = useState();
  const [locationHotel, setLocationHotel] = useState();

  const [smallCap, setSmallCap] = useState();
  const [smallPrice, setSmallPrice] = useState();
  const [smallNightPrice, setSmallNightPrice] = useState();

  const [smallOgPrice, setSmallOgPrice] = useState();
  const [smallNightOgPrice, setSmallNightOgPrice] = useState();

  const [medCap, setMedCap] = useState();
  const [medPrice, setMedPrice] = useState();
  const [medNightPrice, setMedNightPrice] = useState();

  const [medOgPrice, setMedOgPrice] = useState();
  const [medNightOgPrice, setMedNightOgPrice] = useState();

  const [largeCap, setLargeCap] = useState();
  const [largePrice, setLargePrice] = useState();
  const [largeNightPrice, setLargeNightPrice] = useState();

  const [largeOgPrice, setLargeOgPrice] = useState();
  const [largeNightOgPrice, setLargeNightOgPrice] = useState();

  const [totalPersons, setTotalPersons] = useState();
  const [roomType, setRoomType] = useState("small");
  const [selectedRoom, setSelectedRoom] = useState();

  const [smallActive, setSmallActive] = useState("room-type");
  const [medActive, setMedActive] = useState("room-type");
  const [largeActive, setLargeActive] = useState("room-type");

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const [hotel, setHotel] = useState({});
  const [price, setPrice] = useState();
  const [width, setWidth] = useState(0)

  const location = useLocation();
  const history = useHistory();

  TabTitle(`Mera Adda | ${hotelName}`);

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
    fetch(`/api${location.pathname}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSmallCap(parseInt(data[0].roomSmallData.smallCapacity));
          if(data[0].roomSmallData.smallDiscountPrice){
            setSmallPrice(parseInt(data[0].roomSmallData.smallDiscountPrice));
            setSmallNightPrice(parseInt(data[0].roomSmallData.smallNightDiscountPrice));

            setSmallOgPrice(parseInt(data[0].roomSmallData.smallPrice));
            setSmallNightOgPrice(parseInt(data[0].roomSmallData.smallNightPrice));
          }
          else{
            setSmallPrice(parseInt(data[0].roomSmallData.smallPrice));
            setSmallNightPrice(parseInt(data[0].roomSmallData.smallNightPrice));
          }
        

        setMedCap(parseInt(data[0].roomMediumData.mediumCapacity));
        if(data[0].roomMediumData.mediumDiscountPrice){
          setMedPrice(parseInt(data[0].roomMediumData.mediumDiscountPrice));
          setMedNightPrice(parseInt(data[0].roomMediumData.mediumNightDiscountPrice));

          setMedOgPrice(parseInt(data[0].roomMediumData.mediumPrice));
          setMedNightOgPrice(parseInt(data[0].roomMediumData.mediumNightPrice));
        }
        else{
          setMedPrice(parseInt(data[0].roomMediumData.mediumPrice));
          setMedNightPrice(parseInt(data[0].roomMediumData.mediumNightPrice));
        }

        setLargeCap(parseInt(data[0].roomLargeData.largeCapacity));
        if(data[0].roomLargeData.largeDiscountPrice){
          setLargePrice(parseInt(data[0].roomLargeData.largeDiscountPrice));
          setLargeNightPrice(parseInt(data[0].roomLargeData.largeNightDiscountPrice));

          setLargeOgPrice(parseInt(data[0].roomLargeData.largePrice));
          setLargeNightOgPrice(parseInt(data[0].roomLargeData.largeNightPrice));
        }
        else{
          setLargePrice(parseInt(data[0].roomLargeData.largePrice));
          setLargeNightPrice(parseInt(data[0].roomLargeData.largeNightPrice));
        }

        setTotalPersons(parseInt(localStorage.getItem("totalPersons")));
        setHotelName(data[0].hotelName);
        setLocationHotel(data[0].location);
        setAddress(data[0].address);
        setHotel(data[0]);
        localStorage.setItem("isBlockedOn", data[0].isBlockedOn);
        localStorage.getItem("isNightParty");
        localStorage.setItem("hotelEmail", data[0].email);
        localStorage.setItem("back", location.pathname);
      });
  }, []);

  useEffect(() => {
    console.log(selectedRoom);
    if (totalPersons <= smallCap) {
      setSmallActive("room-type-active");
      setSelectedRoom("small");
      setRoomType('small');
      localStorage.setItem("price", smallPrice);
      localStorage.setItem("nightPrice", smallNightPrice);
      localStorage.setItem("room", "Small Room");
    } else if (totalPersons <= medCap) {
      setMedActive("room-type-active");
      setSelectedRoom("medium");
      setRoomType('medium');
      localStorage.setItem("price", medPrice);
      localStorage.setItem("nightPrice", medNightPrice);
      localStorage.setItem("room", "Medium Room");
    } else if (totalPersons <= largeCap) {
      setSelectedRoom("large");
      setRoomType('large');
      setLargeActive("room-type-active");
      localStorage.setItem("room", "Large Room");
      localStorage.setItem("price", largePrice);
      localStorage.setItem("nightPrice", largeNightPrice);
    }
  }, [totalPersons]);

  useEffect(() => {
    setPrice(1000);
  }, [smallActive, medActive, largeActive, price]);



  const manualSmallSelect = () => {
    if (totalPersons <= smallCap) {
      localStorage.setItem("price", smallPrice);
      localStorage.setItem("nightPrice", smallNightPrice);
      localStorage.setItem("room", "Small Room");
      setSelectedRoom("small");
      setSmallActive("room-type-active");
      setMedActive("room-type");
      setLargeActive("room-type");
    } else M.toast({ html: "I am a toast!" });
  };

  const manualMedSelect = () => {
    if (totalPersons <= medCap) {
      localStorage.setItem("price", medPrice);
      localStorage.setItem("nightPrice", medNightPrice);
      localStorage.setItem("room", "Medium Room");
      setSelectedRoom("medium");
      setSmallActive("room-type");
      setMedActive("room-type-active");
      setLargeActive("room-type");
    } else M.toast({ html: "I am a toast!" });
  };

  const manualLargeSelect = () => {
    if (totalPersons <= largeCap) {
      localStorage.setItem("price", largePrice);
      localStorage.setItem("nightPrice", largeNightPrice);
      localStorage.setItem("room", "Large Room");
      setSelectedRoom("large");
      setSmallActive("room-type");
      setMedActive("room-type");
      setLargeActive("room-type-active");
    }
    M.toast({ html: "I am a toast!" });
  };

  const confirm = () => {
    localStorage.setItem("hotel", hotelName);
    localStorage.setItem("address", address);

    localStorage.setItem("smallCap", smallCap);
    localStorage.setItem("smallPrice", smallPrice);
    localStorage.setItem("smallNightPrice", smallNightPrice);

    localStorage.setItem("medCap", medCap);
    localStorage.setItem("medPrice", medPrice);
    localStorage.setItem("medNightPrice", medNightPrice);

    localStorage.setItem("largeCap", largeCap);
    localStorage.setItem("largePrice", largePrice);
    localStorage.setItem("largeNightPrice", largeNightPrice);

    history.push("/confirmBooking");
  };
  if(isMobile || width <= 980 ){
  return (
    <div className="w-100 text-light bg-brand">
      <Link to="/hotelList">
        <FontAwesomeIcon className="back-arrow" icon={faArrowLeft} />
      </Link>
      <CarouselContainer selectedRoom={roomType} hotel={hotel}  />
      <div className="w-90 p-4 pb-2 ">
        <div className="user-hotel-box  w-90">
          <div>
            <h2>{hotelName}</h2>
            <h6>{address}</h6>
          </div>
          <a href={locationHotel}>
            <div className="location-border ">
              <FontAwesomeIcon
                className="d-flex mx-auto my-2"
                style={{ color: "#fe9124", width: "2.5em", height: "2.5em" }}
                icon={faMapMarkedAlt}
              />
              <p className="text-center brand-logo">Look Map</p>
            </div>
          </a>
        </div>

        <h4 className="f-16 w-90 text-center pt-3">
        Night charges will be applied on bookings after 6pm
        </h4>
        <div className="d-flex pt-4">
          <h4 className="f-16 px-2">Choose one</h4>
          <FontAwesomeIcon
            className=""
            style={{ color: "#fe9124", width: "1em", height: "1em" }}
            icon={faCheckCircle}
          />
        </div>

        <div>
          {smallCap ? (
            <div
              id="small"
              tabIndex="1"
              className={`${smallActive} `}
              onClick={(e) => {
                manualSmallSelect();
                setRoomType("small");
              }}
            >
              <p className="f-16 font-weight-bolder">Small Room</p>
              <p>Upto {smallCap} people</p>
              <div className="line-ht-0">
                <p>Day-Price </p>
                {
                  smallOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{smallOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {smallPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {smallPrice}</p>
                }
              </div>
              <div className="line-ht-0">
                <p>Night-Price</p>
                {
                  smallNightOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{smallNightOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {smallNightPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {smallNightPrice}</p>
                }
              </div>
            </div>
          ) : null
          
          }
          {medCap ? (
            <div
              id="med"
              tabIndex="1"
              className={`${medActive}`}
              onClick={(e) => {
                manualMedSelect();
                setRoomType("medium");
              }}
            >
              <p className="f-16 font-weight-bolder">Medium Room</p>
              <p>Upto {medCap} people</p>
              <div className="line-ht-0">
                <p>Day-Price </p>
                {
                  medOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{medOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {medPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {medPrice}</p>
                }
              </div>
              <div className="line-ht-0">
                <p>Night-Price</p>
                {
                  medNightOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{medNightOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {medNightPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {medNightPrice}</p>
                }
              </div>
            </div>
          ) : null}
          {largeCap ? (
            <div
              id="large"
              tabIndex="1"
              className={`${largeActive}`}
              onClick={(e) => {
                manualLargeSelect();
                setRoomType("large");
              }}
            >
              <p className="f-16 font-weight-bolder">Large Room</p>
              <p>Upto {largeCap} people</p>
              <div className="line-ht-0">
                <p>Day-Price </p>
                {
                  largeOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{largeOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {largePrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {largePrice}</p>
                }
              </div>
              <div className="line-ht-0">
                <p>Night-Price</p>
                {
                  largeNightOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{largeNightOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {largeNightPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {largeNightPrice}</p>
                }
              </div>
            </div>
          ) : null}
        </div>

        {/* <button
          onClick={() => {
            isAuthenticated ? displayRazorpay() : history.push("/usignin");
          }}
          className="waves-effect waves-dark btn #64b5f6 blue lighten-2"
        >
          Pay Rs. {price}
        </button> */}
        <button
          type="submit"
          className="text-light w-40 mt-5 "
          style={{
            backgroundColor: "#fe9124",
            height: "40px",
            borderRadius: "18px",
            border: "none",
            marginBottom: "7em",
            marginLeft: "58vw",
          }}
          onClick={confirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
  }
  else{
    return(
      <>
        <div className="w-90 text-light bg-brand mx-auto">
        <div className="d-flex justify-content-between mb-3">
          <div>
            <h2 className='f-44'>{hotelName}</h2>
            <h5>{address}</h5>
          </div>
          <a href={locationHotel}>
            <div className="location-border">
              <FontAwesomeIcon
                className="d-flex mx-auto my-2"
                style={{ color: "#fe9124", width: "2.5em", height: "2.5em" }}
                icon={faMapMarkedAlt}
              />
              <p className="text-center brand-logo">Look Map</p>
            </div>
          </a>
        </div>
      <CarouselContainer selectedRoom={roomType} hotel={hotel} device='desktop' />
      <div className="w-90 p-4 pb-2 ">
        <h4 className="f-16 w-90 text-center pt-3">
          Night charges will be applied on bookings after 6pm
        </h4>
        <div className="d-flex pt-4">
          <h4 className="f-16 px-2">Choose one</h4>
          <FontAwesomeIcon
            className=""
            style={{ color: "#fe9124", width: "1em", height: "1em" }}
            icon={faCheckCircle}
          />
        </div>
    <Row>
          {smallCap ? (
            <Col lg="4" md="6" sm="12">
              <div
              id="small"
              tabIndex="1"
              className={`${smallActive} w-85 d-flex flex-column`}
              onClick={(e) => {
                manualSmallSelect();
                setRoomType("small");
              }}
            >
              <div className="">
                <p className="f-18 font-weight-bolder mb-0">Small Room</p>
                <p className='f-16'>Upto {smallCap} people</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Day-Price </p>
                {
                  smallOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{smallOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {smallPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {smallPrice}</p>
                }
              </div>
              <div className="d-flex justify-content-between">
                <p>Night-Price</p>
                {
                  smallNightOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{smallNightOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {smallNightPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {smallNightPrice}</p>
                }
              </div>
              </div>
            </Col>
          ) : null
          
          }
          {medCap ? (
            <Col lg="4" md="6" sm="12">
              <div
              id="med"
              tabIndex="1"
              className={`${medActive} w-85 d-flex flex-column`}
              onClick={(e) => {
                manualMedSelect();
                setRoomType("medium");
              }}
            >
              <div>
                <p className="f-18 font-weight-bolder mb-0">Medium Room</p>
                <p className='f-16'>Upto {medCap} people</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Day-Price </p>
                {
                  medOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{medOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {medPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {medPrice}</p>
                }
              </div>
              <div className="d-flex justify-content-between">
                <p>Night-Price</p>
                {
                  medNightOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{medNightOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {medNightPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {medNightPrice}</p>
                }
              </div>
              </div>
            </Col>
          ) : null}
          {largeCap ? (
            <Col lg="4" md="6" sm="12">
              <div
              id="large"
              tabIndex="1"
              className={`${largeActive} w-85 d-flex flex-column`}
              onClick={(e) => {
                manualLargeSelect();
                setRoomType("large");
              }}
            >
              <div>
                <p className="f-18 font-weight-bolder mb-0">Large Room</p>
                <p className='f-16'>Upto {largeCap} people</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Day-Price </p>
                {
                  largeOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{largeOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {largePrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {largePrice}</p>
                }
              </div>
              <div className="d-flex justify-content-between">
                <p>Night-Price</p>
                {
                  largeNightOgPrice ?
                  <p className="font-weight-bolder">Rs<span className='discount' style={{textDecoration:'line-through',color:'red'}}>{largeNightOgPrice}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}> {largeNightPrice}</span></p>
                  :
                  <p className="font-weight-bolder">Rs {largeNightPrice}</p>
                }
              </div>
              </div>
            </Col>
          ) : null}
      </Row>
        <button
          type="submit"
          className="text-light w-20 py-3 mb-10 mt-4 font-weight-bolder"
          style={{
            backgroundColor: "#fe9124",
            border: "none",
          }}
          onClick={confirm}
        >
          Confirm
        </button>
      </div>
    </div>
    <FooterDesktop />
      </>
    )
  }
};

export default UserHotel;
