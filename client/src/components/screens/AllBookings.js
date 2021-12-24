import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AllBookings = () => {
  const history = useHistory();
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch(`getConfirmBookingsUser?User=abc@abc.com`, {
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
          // console.log(data);
        }
      });
  }, []);

  return (
    <div>
      <h1 className="brand-logo f-20 text-center mt-4">Booking History</h1>
      {booking.map((oneBooking) => {
        const Hotel = oneBooking.Hotel;
        const DateOfBooking = oneBooking.DateOfBooking;
        const BillingAmount = oneBooking.BillingAmount;
        const OrderId = oneBooking.OrderId;
        const PaymentTime = oneBooking.PaymentTime;
        const TimeSlot = oneBooking.TimeSlot;
        const TotalPersons = oneBooking.TotalPersons;
        const Type = oneBooking.Type;
        const ArrivalTime = oneBooking.ArrivalTime;

        const previewFullBill = () => {
          const newarr = [
            Hotel,
            DateOfBooking,
            BillingAmount,
            OrderId,
            PaymentTime,
            TimeSlot,
            TotalPersons,
            Type,
            ArrivalTime,
          ];
          localStorage.setItem("OldBill", newarr);
          history.push("/oldBill/" + OrderId);
        };

        return (
          <div>
            <style>{"body { background-color: #1a1b41; }"}</style>
            <div
              className="hlist p-2 pt-4 "
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
                <p className="f-14 font-weight-bolder">Date Of Booking</p>
                <p className="f-14">{DateOfBooking}</p>
              </div>
              <div>
                <p className="f-14 font-weight-bolder">Billing Amount</p>
                <p className="f-14">Rs. {BillingAmount}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllBookings;
