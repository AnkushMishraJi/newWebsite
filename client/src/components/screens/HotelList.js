import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      {hotels.map((oneHotel) => {
        const smallPrice = oneHotel.roomSmallData.smallPrice;
        const medPrice = oneHotel.roomMediumData.mediumPrice;
        const largePrice = oneHotel.roomLargeData.largePrice;

        const smallCap = parseInt(oneHotel.roomSmallData.smallCapacity);
        const medCap = parseInt(oneHotel.roomMediumData.mediumCapacity);
        const largeCap = parseInt(oneHotel.roomLargeData.largeCapacity);

        const newtotal = parseInt(localStorage.getItem("totalPersons"));

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
            <div className="mycard card">
              <img
                src={oneHotel.mainPicUrl}
                alt={"hotel" + oneHotel.hotelName}
                style={{ width: 200, height: 200 }}
              />
              <h5>{oneHotel.hotelName}</h5>
              <h6>{oneHotel.address}</h6>
              <h6>
                Small Room : {smallPrice} Capacity:
                {smallCap}
              </h6>
              <h6>
                MEd Room: {medPrice} Capacity:
                {medCap}
              </h6>
              <h6>
                LArge Room :{largePrice} Capacity:
                {largeCap}
              </h6>
              <h5>Price:{price()}</h5>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default HotelList;
