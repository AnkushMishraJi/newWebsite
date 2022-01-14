import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BHotelBlocker from "./BHotelBlocker";

const HotelDashboard = () => {
  const [activeState, setActiveState] = useState("bookings");
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
    showbookings();
  }, []);

  const clickHandler = () => {
    history.push("/bsignin");
    // console.log("signout");
  };

  const showbookings = () => {
    const hotelEmail = localStorage.getItem("email");
    fetch(`/api/hotelBooking?hotelEmail=${hotelEmail}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyBookings(data);
        console.log(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // var splitDate = DateOfBooking.split(" ");
  // var displayDate = splitDate.splice(0, 4).join(" ");

  // var splitTime = ArrivalTime.split(" ");
  // var displayTime = splitTime.splice(3, 2).join(" ");

  return (
    <div className="wrapper">
      <div className="left-sidebar d-flex w-25 flex-column align-items-center">
        <div
          className="waves-effect waves-light btn font-weight-bolder bg-orange"
          onClick={() => {
            setActiveState("blocker");
          }}
        >
          Block/Unblock
        </div>
        <div
          className="waves-effect waves-light btn font-weight-bolder bg-orange"
          onClick={() => {
            setActiveState("bookings");
            showbookings();
          }}
        >
          Bookings
        </div>
        {/* <Link to="/BuploadPhoto" className="waves-effect waves-light btn font-weight-bolder bg-orange">
          Upload Photos
        </Link> */}
        <button
          onClick={clickHandler}
          className="waves-effect waves-light btn font-weight-bolder bg-orange"
        >
          Sign out
        </button>
      </div>

      {activeState == "bookings" ? (
        <div className="center-bar w-100">
          {myBookings.map((item) => {
            return (
              <div className="booking-box">
                <p>Phone: {item.phone}</p>
                <p>Persons: {item.totalPersons}</p>
                <p>Date of check in: {item.checkIn}</p>
                <p>Time of check in: {item.checkIn}</p>
                <p>Slot: </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="center-bar w-100 p-3">
          <div className="mt-5">
            <BHotelBlocker />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDashboard;
