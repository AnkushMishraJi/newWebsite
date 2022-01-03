import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import M from "materialize-css";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const date = new Date(localStorage.getItem("bookingDate")).toDateString();
    const totalPersons = localStorage.getItem("totalPersons");
    const girls = localStorage.getItem("girls");
    const isNightParty = localStorage.getItem("isNightParty");

    fetch(
      `/api/hotelList?date=${date}&totalPersons=${totalPersons}&girls=${girls}&isNightParty=${isNightParty}`,
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
    <div className="bg-brand">
      <Link to="/">
        <FontAwesomeIcon
          className="back-arrow waves-effect"
          icon={faArrowLeft}
        />
      </Link>

      <div className="brand-logo f-20 my-5   text-center ">HOTEL LIST</div>

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
          <Link key={oneHotel._id} to={"/userHotel/" + oneHotel._id}>
            <div className="hlist">
              <img
                className="hlist-img"
                src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/main.jpg`}
                alt={"hotel" + oneHotel.hotelName}
              />
              <div className="half-card">
                <h5 className="f-16 font-weight-bolder ">
                  {oneHotel.hotelName}
                </h5>
                <h6 className="f-16 font-weight-light">{oneHotel.address}</h6>
                <div
                  style={{
                    display: "grid ",
                    gridTemplateColumns: " 10fr 1fr 6fr",
                  }}
                >
                  <h5 className="f-14">Starting from Rs.{price()}</h5>
                  <FontAwesomeIcon icon={faUser} />
                  <h5 className="f-14" style={{ textAlign: "left" }}>
                    Upto {maxPersons} people
                  </h5>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <p className="mt-2">.</p>
      <p className="mt-4">.</p>
    </div>
  );
};

export default HotelList;
