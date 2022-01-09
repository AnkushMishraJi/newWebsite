import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";

const HotelBlocker = () => {
  const [isBlockedOn, setIsBlockedOn] = useState(["December 09 2020"]);
  const email = localStorage.getItem("email");

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
        // console.log(data[0].isBlockedOn);
      });
  }, []);

  const Block = () => {
    const arrOfDates = isBlockedOn.map((ms) => {
      var dateWithoutTime = new Date(ms);

      return new Date(dateWithoutTime.setHours(0, 0, 0, 0)).toDateString();
    });
    // console.log(arrOfDates);
    fetch("/api/blockUnblock", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        isBlockedOn: arrOfDates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  return (
    <div className="bg-brand text-light p-5 d-flex flex-column algn-items-center">
      <p className="font-weight-bolder f-16">
        Select and Submit Dates of Unavailability
      </p>
      <div className="bg-light px-2 py-0 mt-3">
        <DatePicker
          className="px-3"
          multiple
          value={isBlockedOn}
          format="ddd MMM DD YYYY"
          onChange={setIsBlockedOn}
        />
      </div>
      <botton
        className="btn waves-effect bg-orange font-weight-bolder"
        onClick={Block}
      >
        Submit
      </botton>
    </div>
  );
};

export default HotelBlocker;
