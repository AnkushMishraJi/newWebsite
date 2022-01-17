import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import Swal from "sweetalert2";

const HotelBlocker = () => {
  const [isBlockedOn, setIsBlockedOn] = useState([""]);
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: true,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      });
  };

  return (
    <div className="bg-brand text-light p-5 d-flex algn-items-center">
      <div className="">
      <p className="font-weight-bolder f-16">
        Select and Submit Dates of Unavailability
      </p>
        <div className="bg-light px-3 w-75 py-0" style={{borderRadius:"10px"}}> 
          <DatePicker
            multiple
            value={isBlockedOn}
            format="ddd MMM DD YYYY"
            onChange={setIsBlockedOn}
          />
        </div>
      </div>
      <botton
        className="btn waves-effect bg-orange font-weight-bolder mt-5 px-5"
        onClick={Block}
      >
        Submit
      </botton>
    </div>
  );
};

export default HotelBlocker;
