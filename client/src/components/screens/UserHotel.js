import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Carousel } from "react-bootstrap";
import M from "materialize-css";

import CarouselContainer from "../CarouselContainer";

import {
  faMapPin,
  faCheckCircle,
  faArrowLeft,
  faMapMarker,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const shortid = require("shortid");

const UserHotel = () => {
  const [hotelName, setHotelName] = useState();
  const [address, setAddress] = useState();
  const [locationHotel, setLocationHotel] = useState();

  const [smallCap, setSmallCap] = useState();
  const [smallPrice, setSmallPrice] = useState();
  const [smallNightPrice, setSmallNightPrice] = useState();

  const [medCap, setMedCap] = useState();
  const [medPrice, setMedPrice] = useState();
  const [medNightPrice, setMedNightPrice] = useState();

  const [largeCap, setLargeCap] = useState();
  const [largePrice, setLargePrice] = useState();
  const [largeNightPrice, setLargeNightPrice] = useState();

  const [isNightParty, setIsNightParty] = useState();
  const [totalPersons, setTotalPersons] = useState();
  const [roomType, setRoomType] = useState("small");
  const [selectedRoom, setSelectedRoom] = useState();

  const [smallActive, setSmallActive] = useState("room-type");
  const [medActive, setMedActive] = useState("room-type");
  const [largeActive, setLargeActive] = useState("room-type");

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const [nightPrice, setNightPrice] = useState();
  const [pic, setPic] = useState();

  //This is used by Razorpay (Shift all Razorpay functions to Confirmation Page)
  const [price, setPrice] = useState();

  const location = useLocation();
  const history = useHistory();

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
        setSmallPrice(parseInt(data[0].roomSmallData.smallPrice));
        setSmallNightPrice(parseInt(data[0].roomSmallData.smallNightPrice));

        setMedCap(parseInt(data[0].roomMediumData.mediumCapacity));
        setMedPrice(parseInt(data[0].roomMediumData.mediumPrice));
        setMedNightPrice(parseInt(data[0].roomMediumData.mediumNightPrice));

        setLargeCap(parseInt(data[0].roomLargeData.largeCapacity));
        setLargePrice(parseInt(data[0].roomLargeData.largePrice));
        setLargeNightPrice(parseInt(data[0].roomLargeData.largeNightPrice));

        setTotalPersons(parseInt(localStorage.getItem("totalPersons")));
        setHotelName(data[0].hotelName);
        setLocationHotel(data[0].location);
        setAddress(data[0].address);
        setPic(data[0].mainPicUrl);

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
      localStorage.setItem("price", smallPrice);
      localStorage.setItem("nightPrice", smallNightPrice);
      localStorage.setItem("room", "Small Room");
    } else if (totalPersons <= medCap) {
      setMedActive("room-type-active");
      setSelectedRoom("medium");
      localStorage.setItem("price", medPrice);
      localStorage.setItem("nightPrice", medNightPrice);
      localStorage.setItem("room", "Medium Room");
    } else if (totalPersons <= largeCap) {
      setSelectedRoom("large");
      setLargeActive("room-type-active");
      localStorage.setItem("room", "Large Room");
      localStorage.setItem("price", largePrice);
      localStorage.setItem("nightPrice", largeNightPrice);
    }
  }, [totalPersons]);

  useEffect(() => {
    setPrice(1000);
  }, [smallActive, medActive, largeActive, price]);

  // async function displayRazorpay() {
  //   // console.log("rzp Running");

  //   const data = await fetch("/razorpay", {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       amount: price * 100,
  //       currency: "INR",
  //       payment_capture: 1,
  //       receipt: shortid.generate(),
  //     }),
  //   }).then((res) => res.json());
  //   console.log(data);
  //   localStorage.setItem("Hotel", hotelName);

  //   const options = {
  //     key: "rzp_test_ZwIQoXjws19gWq", // Enter the Key ID generated from the Dashboard
  //     amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: data.currency,
  //     name: "Acme Corp",
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     created_at: data.created_at,
  //     handler: function (response) {
  //       alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature);
  //       // console.log(JSON.stringify(response));
  //       history.push("/bill");
  //     },
  //     prefill: {
  //       name: "Gaurav Kumar",
  //       email: "gaurav.kumar@example.com",
  //       contact: "9999999999",
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };
  //   var rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  //   localStorage.setItem("razor", JSON.stringify(data));
  // }

  const carouselContent = (selectedRoom) => {
    return (
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/${selectedRoom}/hotel1.jpg`}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/${selectedRoom}/hotel2.jpg`}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/${selectedRoom}/hotel3.jpg`}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  };

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

  return (
    <div className="w-100 text-light bg-brand">
      <Link to="/hotelList">
        <FontAwesomeIcon className="back-arrow" icon={faArrowLeft} />
      </Link>
      <CarouselContainer selectedRoom={roomType} />
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
          Bookings for time after 6 pm will fall in Night Slot therefore Night
          Price will be charged
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
                <p className="font-weight-bolder">Rs {smallPrice}</p>
              </div>
              <div className="line-ht-0">
                <p>Night-Price</p>
                <p className="font-weight-bolder">Rs {smallNightPrice}</p>
              </div>
            </div>
          ) : null}
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
                <p className="font-weight-bolder">Rs {medPrice}</p>
              </div>
              <div className="line-ht-0">
                <p>Night-Price</p>
                <p className="font-weight-bolder">Rs {medNightPrice}</p>
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
                <p className="font-weight-bolder">Rs {largePrice}</p>
              </div>
              <div className="line-ht-0">
                <p>Night-Price</p>
                <p className="font-weight-bolder">Rs {largeNightPrice}</p>
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
};

export default UserHotel;
