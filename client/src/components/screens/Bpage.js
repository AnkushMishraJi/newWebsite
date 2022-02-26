import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BHotelBlocker from "./BHotelBlocker";
import SetPrices from "./BpageSetPrices";


const HotelDashboard = () => {
  const [activeState, setActiveState] = useState("blocker");

  const [myBookings, setMyBookings] = useState([]);
  const [isBlockedOn, setIsBlockedOn] = useState([""]);
  const email = localStorage.getItem("email");

  const history = useHistory();

  useEffect(() => {
    showbookings();
  }, []);

  useEffect(() => {
    fetch(`/api/getBlockedDates?email=${email}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsBlockedOn(data[0].isBlockedOn);
        localStorage.setItem("b_id", data[0]._id);
        //console.log(data[0].isBlockedOn);
      });
  }, [activeState]);

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

  const render = () =>{
    if(activeState=="bookings"){
      return(
        <div className="">
          {myBookings.map((item) => {
            return (
              <div className="booking-box">
                <p>Phone: {item.phone}</p>
                <p>Persons: {item.totalPersons}</p>
                <p>Date of check in: {item.checkIn}</p>
                <p>Time of check in: {item.checkIn}</p>
                <p>Slot: {item.slot}</p>
              </div>
            );
          })}
        </div>
      );
    }
    else if(activeState=="setPrice"){
      return(
        <div>
          <SetPrices />
        </div>
      );
    }
    else {
      return(
        <div>
          <div className="mt-5 w-50 mx-auto">
            <BHotelBlocker />
            
            <div className="booking-box">
              <p className="font-weight-bolder f-24">Dates Blocked</p>
              {
                isBlockedOn.map((item, index)=>{
                  return(
                    <p>{index+1}. {item}</p>
                  )
                })
              }
              </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="">
      <div className="d-flex flex-column w-25 mr-auto">
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
            setActiveState("setPrice");
          }}
        >
          Set/Update Prices
        </div>

        <button
          onClick={clickHandler}
          className="waves-effect waves-light btn font-weight-bolder bg-orange"
        >
          Sign out
        </button>
      </div>
      {render()}
    </div>
  );
};

export default HotelDashboard;
