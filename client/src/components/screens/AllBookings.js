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
            <div class="card-panel white" onClick={previewFullBill}>
              <p>Hotel: {Hotel}</p>
              <p>Date Of Booking: {DateOfBooking}</p>
              <p>Billing Amount: Rs. {BillingAmount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllBookings;
