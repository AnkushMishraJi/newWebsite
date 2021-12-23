import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const HotelDashboard = () => {
  //To refresh every minute
  //   const [seconds, setSeconds] = useState(0);
  //   const [isActive, setIsActive] = useState(false);

  //   function toggle() {
  //     setIsActive(!isActive);
  //   }

  //   function reset() {
  //     setSeconds(0);
  //     setIsActive(false);
  //   }

  //   useEffect(() => {
  //     let interval = null;
  //     if (isActive) {
  //       interval = setInterval(() => {
  //         setSeconds(seconds => seconds + 1);
  //       }, 1000);
  //     } else if (!isActive && seconds !== 0) {
  //       clearInterval(interval);
  //     }
  //     return () => clearInterval(interval);
  //   }, [isActive, seconds]);
  //To refresh every minute

  const [myBookings, setMyBookings] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const hotelEmail = localStorage.getItem("email");
    fetch(`/hotelBooking?hotelEmail=${hotelEmail}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyBookings(data);
        // console.log(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const clickHandler = () => {
    history.push("/bsignin");
    // console.log("signout");
  };
  return (
    <div className="wrapper">
      <div className="left-sidebar">
        <Link
          to="/blocker"
          className="waves-effect waves-light btn #e53935 red darken-1"
        >
          Block/Unblock
        </Link>
        <Link to="/BuploadPhoto" className="waves-effect waves-light btn">
          Upload Photos
        </Link>
        <button onClick={clickHandler} className="waves-effect waves-light btn">
          Sign out
        </button>
      </div>

      <div className="center-bar">
        {myBookings.map((item) => {
          return (
            <div className="booking-box">
              <p>id: {item._id}</p>
              <p>Name: {item.name}</p>
              <p>
                Persons: {item.boys} boys, {item.girls} girls
              </p>
              <p>Date of check in: {item.checkIn}</p>
              <p>Slot: Day</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelDashboard;
