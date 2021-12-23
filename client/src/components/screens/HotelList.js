import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const date = localStorage.getItem("date");
    const totalPersons = localStorage.getItem("totalPersons");
    const girls = localStorage.getItem("girls");
    const isNightParty = localStorage.getItem("isNightParty");

    fetch(
      `/hotelList?date=${date}&totalPersons=${totalPersons}&girls=${girls}&isNightParty=${isNightParty}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        // console.log(data);
        // console.log(totalPersons);
      });
  }, []);

  return (
    <>
      <div
        className="brand-logo f-16"
        style={{ margin: "20px", marginLeft: "20px" }}
      >
        HOTEL LIST
      </div>
      {hotels.map((oneHotel) => {
        const smallPrice = oneHotel.roomSmallData.smallPrice;
        const medPrice = oneHotel.roomMediumData.mediumPrice;
        const largePrice = oneHotel.roomLargeData.largePrice;

        const smallCap = parseInt(oneHotel.roomSmallData.smallCapacity);
        const medCap = parseInt(oneHotel.roomMediumData.mediumCapacity);
        const largeCap = parseInt(oneHotel.roomLargeData.largeCapacity);

        const newtotal = parseInt(localStorage.getItem("totalPersons"));

        var maxPersons;
        if (largeCap) {
          maxPersons = largeCap;
        } else if (medCap) {
          maxPersons = medCap;
        } else {
          maxPersons = smallCap;
        }

        // console.log(newtotal, " is new total");
        // console.log(smallCap, medCap, largeCap);

        const price = () => {
          if (newtotal <= smallCap) {
            // console.log("small running");
            return smallPrice;
          }
          if (newtotal <= medCap) {
            // console.log("med running");
            return medPrice;
          }
          if (newtotal <= largeCap) {
            // console.log("large running");
            return largePrice;
          }
        };

        return (
          <Link to={"/userHotel/" + oneHotel._id}>
            <div className="hlist">
              <style>{"body { background-color: #1a1b41; }"}</style>
              <img
                className=""
                src={oneHotel.mainPicUrl}
                alt={"hotel" + oneHotel.hotelName}
                style={{
                  width: "100%",
                  height: 150,
                  borderStartEndRadius: "08px",
                  borderStartStartRadius: "08px",
                }}
              />
              <div className="half-card">
                <h5 className="f-16 font-weight-bolder ">
                  {oneHotel.hotelName}
                </h5>
                <h6 className="f-12 font-weight-light">{oneHotel.address}</h6>
                <div
                  style={{
                    display: "grid ",
                    gridTemplateColumns: " 10fr 1fr 6fr",
                  }}
                >
                  <h5 className="f-12">Starting from Rs.{price()}</h5>
                  <FontAwesomeIcon className="mx-auto" icon={faUser} />
                  <h5 className="f-12" style={{ textAlign: "right" }}>
                    Upto {maxPersons} people
                  </h5>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default HotelList;
