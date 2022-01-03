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
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./components/screens/UserPage";
import ConfirmBooking from "./components/screens/ConfirmBooking";
import CarouselContainer from "./components/CarouselContainer";
import Error404 from "./components/screens/Error404";
import Error500 from "./components/screens/Error500";
import LandingPage from "./components/screens/LandingPage";
// import { reducer, initialState } from "./reducers/userReducer";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);

  const userRoutes = () => {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Home />
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
          <Route path="/userHotel">
            <UserHotel />
          </Route>
          <Route path="/hotelList">
            <HotelList />
          </Route>
          <Route path="/confirmBooking">
            <ConfirmBooking />
          </Route>
          <Route path="/bill">
            <Bill />
          </Route>
          <Route path="/oldBill">
            <OldBill />
          </Route>
          <Route path="/error404">
            <Error404 />
          </Route>
          <Route path="/error500">
            <Error500 />
          </Route>
          <Route path="/services">
            <LandingPage />
          </Route>
          <ProtectedRoute exact path="/allBookings" component={AllBookings} />
          <ProtectedRoute exact path="/oldBill" component={OldBill} />
          <ProtectedRoute exact path="/bill" component={Bill} />
          <ProtectedRoute exact path="/userpage" component={UserPage} />
        </Switch>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/bsignin">
          <Signin />
        </Route>
        <Route path="/bsignup">
          <Signup />
        </Route>
        <Route path="/BuploadPhoto">
          <UploadPhoto />
        </Route>
        <Route path="/hoteladmin">
          <HotelDashboard />
        </Route>
        <Route component={userRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
