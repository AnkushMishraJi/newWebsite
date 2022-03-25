import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Addtag from "../Btags";
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
    else if(activeState=="addtags"){
      return(
        <div>
          <Addtag />
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
    <>
    {/* <div className="">
      <div className="d-flex flex-column w-25 mr-auto">
        <div
          className="waves-effect waves-light btn font-weight-bolder bg-red"
          onClick={() => {
            setActiveState("blocker");
          }}
        >
          Block/Unblock
        </div>

        <div
          className="waves-effect waves-light btn font-weight-bolder bg-red"
          onClick={() => {
            setActiveState("setPrice");
          }}
        >
          Set/Update Prices
        </div>

        <button
          onClick={clickHandler}
          className="waves-effect waves-light btn font-weight-bolder bg-red"
        >
          Sign out
        </button>
      </div>
      {render()}
    </div> */}
    <div className="mx-auto" style={{ display: "grid", gridGap: "25px" }}>
    
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-10 col-xxl-3 mx-auto" style={{borderRight: "2px solid black"}}>
              <div className="d-flex flex-column w-75 mr-auto">
                <div
                  className="waves-effect waves-light btn font-weight-bolder bg-red"
                  onClick={() => {
                    setActiveState("blocker");
                  }}
                >
                  Block/Unblock
                </div>
                <br/>
                <div
                  className="waves-effect waves-light btn font-weight-bolder bg-red"
                  onClick={() => {
                    setActiveState("setPrice");
                  }}
                >
                  Set/Update Prices
                </div>
                <br/>
                <div
                  className="waves-effect waves-light btn font-weight-bolder bg-red"
                  onClick={() => {
                    setActiveState("addtags");
                  }}
                >
                  Add Tags
                </div>
                <br/>
                <button
                  onClick={clickHandler}
                  className="waves-effect waves-light btn font-weight-bolder bg-red"
                >
                  Sign out
                </button>
              </div>
              
          </div>
          <div className="col-md-9 col-10 col-xxl-9 mx-auto">
            {render()}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HotelDashboard;
