import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AllBookings = () => {
  const user = localStorage.getItem("phone");
  const history = useHistory();
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch(`/api/getConfirmBookingsUser?User=${user}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // console.log(data.error);
        } else {
          // console.log("Searched Successfuly");
          setBooking(data);
          console.log(data);
          sortToDate(data);

          // console.log(data);
        }
      });
  }, []);

  const sortToDate = (data) => {
    data.sort(function (a, b) {
      var c = new Date(a.DateOfBooking);
      var d = new Date(b.DateOfBooking);
      return console.log(c - d);
    });
  };

  return (
    <div>
      <h1 className="brand-logo f-20 text-center mt-4">Booking History</h1>
      {booking.map((oneBooking) => {
        const Hotel = oneBooking.Hotel;
        const DateOfBooking = oneBooking.DateOfBooking.split(" ");
        const displayDate = DateOfBooking.splice(0, 4).join(" ");

        const BillingAmount = oneBooking.BillingAmount;
        const OrderId = oneBooking.OrderId;
        const PaymentTime = oneBooking.PaymentTime;
        const TimeSlot = oneBooking.TimeSlot;
        const TotalPersons = oneBooking.TotalPersons;
        const Type = oneBooking.Type;
        const ArrivalTime = new Date(oneBooking.ArrivalTime);
        const displayTime = ArrivalTime.toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
          minute: "numeric",
        }).toString();

        const previewFullBill = () => {
          const newarr = [
            Hotel,
            displayDate,
            BillingAmount,
            OrderId,
            PaymentTime,
            TimeSlot,
            TotalPersons,
            Type,
            displayTime,
          ];

          localStorage.setItem("OldBill", newarr);
          history.push("/oldBill/" + OrderId);
        };

        return (
          <div>
            <style>{"body { background-color: #1a1b41; }"}</style>
            <div
              className="blist p-2 pt-4 "
              style={{
                gridGap: "8px",
              }}
              onClick={previewFullBill}
            >
              <div>
                <p className="f-14 font-weight-bolder ">Hotel</p>
                <p className="f-14">{Hotel}</p>
              </div>
              <div>
                <p className="f-14 font-weight-bolder">Date Of Arrival</p>
                <p className="f-14">{displayDate}</p>
              </div>
              <div>
                <p className="f-14 font-weight-bolder">Billing Amount</p>
                <p className="f-14">Rs. {BillingAmount}</p>
              </div>
            </div>
          </div>
        );
      })}
      <p className="my-5">.</p>
    </div>
  );
};

export default AllBookings;
