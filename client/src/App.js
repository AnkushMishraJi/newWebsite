import React, { useEffect, createContext, useReducer, useContext } from "react";

import Home from "./components/screens/Home";
import NavigationBar from "./components/navbar";

import Signin from "./components/screens/Bsignin";
import Signup from "./components/screens/Bsignup";
import HotelDashboard from "./components/screens/Bpage";

import UserSignin from "./components/screens/Usignin";
import UserPhoneCheck from "./components/screens/Uphone";
import UserSignup from "./components/screens/Usignup";
import HotelBlocker from "./components/screens/BHotelBlocker";
import UserHotel from "./components/screens/UserHotel";
import HotelList from "./components/screens/HotelList";
import UploadPhoto from "./components/screens/BuploadPhoto";
import Bill from "./components/screens/Bill";
import AllBookings from "./components/screens/AllBookings";
import OldBill from "./components/screens/OldBill";

// import { reducer, initialState } from "./reducers/userReducer";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/bsignin">
        <Signin />
      </Route>
      <Route path="/bsignup">
        <Signup />
      </Route>
      <Route path="/usignin">
        <UserSignin />
      </Route>
      <Route path="/uphone">
        <UserPhoneCheck />
      </Route>
      <Route path="/usignup">
        <UserSignup />
      </Route>
      <Route path="/hoteladmin">
        <HotelDashboard />
      </Route>
      <Route path="/blocker">
        <HotelBlocker />
      </Route>
      <Route path="/userHotel">
        <UserHotel />
      </Route>
      <Route path="/hotelList">
        <HotelList />
      </Route>
      <Route path="/BuploadPhoto">
        <UploadPhoto />
      </Route>
      <Route path="/bill">
        <Bill />
      </Route>
      <Route path="/allBookings">
        <AllBookings />
      </Route>
      <Route path="/oldBill">
        <OldBill />
      </Route>
    </BrowserRouter>
  );
}

export default App;
