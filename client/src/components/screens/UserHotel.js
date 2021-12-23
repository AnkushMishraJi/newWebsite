import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const shortid = require("shortid");

const UserHotel = () => {
  const [hotelName, setHotelName] = useState();
  const [locationHotel, setLocationHotel] = useState();
  const [price, setPrice] = useState();
  const [nightPrice, setNightPrice] = useState();
  const [pic, setPic] = useState();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetch(location.pathname, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const smallCap = parseInt(data[0].roomSmallData.smallCapacity);
        const medCap = parseInt(data[0].roomMediumData.mediumCapacity);
        const largeCap = parseInt(data[0].roomLargeData.largeCapacity);
        const newTotal = parseInt(localStorage.getItem("totalPersons"));
        setHotelName(data[0].hotelName);
        setLocationHotel(data[0].location);
        if (newTotal <= smallCap) {
          setPrice(data[0].roomSmallData.smallPrice);
          setNightPrice(data[0].roomSmallData.smallNightPrice);
        } else if (newTotal <= medCap) {
          setPrice(data[0].roomMediumData.mediumPrice);
          setNightPrice(data[0].roomMediumData.mediumNightPrice);
        } else if (newTotal <= largeCap) {
          setPrice(data[0].roomLargeData.largePrice);
          setNightPrice(data[0].roomLargeData.largeNightPrice);
        }

        setPic(data[0].mainPicUrl);
      });
  }, []);

  async function displayRazorpay() {
    // console.log("rzp Running");

    const data = await fetch("/razorpay", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        amount: price * 100,
        currency: "INR",
        payment_capture: 1,
        receipt: shortid.generate(),
      }),
    }).then((res) => res.json());
    // console.log(data);
    localStorage.setItem("Hotel", hotelName);

    const options = {
      key: "rzp_test_ZwIQoXjws19gWq", // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      created_at: data.created_at,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        // console.log(JSON.stringify(response));
        history.push("/bill");
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    localStorage.setItem("razor", JSON.stringify(data));
  }

  return (
    <>
      <img src={pic} alt="hotel" />
      <h2>{hotelName}</h2>
      <h6>{locationHotel}</h6>
      <h4>Discaimer</h4>
      <h5>
        Bookings for time after 1800 hrs will fall in Night Slot therefore Night
        Price will be charged
      </h5>
      <div>
        <h4>Day Slot</h4>
        <h5>Price - Rs {price}</h5>
      </div>
      <div>
        <h4>Night Slot</h4>
        <h5>Price - Rs {nightPrice}</h5>
      </div>
      <a className="btn-floating btn-large waves-effect waves-light red">
        <i className="material-icons">+</i>
      </a>
      <a
        onClick={displayRazorpay}
        className="waves-effect waves-dark btn #64b5f6 blue lighten-2"
      >
        Pay Rs. {price}
      </a>
    </>
  );
};

export default UserHotel;
