import React, { useEffect,useState } from "react";

import Home from "./components/screens/Home";
import NavigationBar from "./components/navbar";

import Signin from "./components/screens/Bsignin";
import Signup from "./components/screens/Bsignup";
import HotelDashboard from "./components/screens/Bpage";

import UserSignin from "./components/screens/Usignin";
import UserPhoneCheck from "./components/screens/Uphone";
import UserSignup from "./components/screens/Usignup";
import UserHotel from "./components/screens/UserHotel";
import HotelList from "./components/screens/HotelList";
import UploadPhoto from "./components/screens/BuploadPhoto";
import Bill from "./components/screens/Bill";
import AllBookings from "./components/screens/AllBookings";
import OldBill from "./components/screens/OldBill";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./components/screens/UserPage";
import ConfirmBooking from "./components/screens/ConfirmBooking";
import Error404 from "./components/screens/Error404";
import Error500 from "./components/screens/Error500";
import LandingPage from "./components/screens/LandingPage";
import DesktopNavbar from "./components/navbarDesktop";
import { BrowserRouter, Route, Switch, useHistory , withRouter} from "react-router-dom";
import AdminDashboard from "./components/screens/AdminDashboard";


const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false

function App() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isBrowser()) {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);

  const userRoutes = () => {
    return (
      <div>
        {
          isMobile || width <= 980 ?
          <NavigationBar />
          :
          <DesktopNavbar />
        }
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/usignin">
            <UserSignin />
          </Route>
          <Route exact path="/uphone">
            <UserPhoneCheck />
          </Route>
          <Route exact path="/usignup">
            <UserSignup />
          </Route>
          <Route path="/userHotel">
            <UserHotel />
          </Route>
          <Route exact path="/hotelList">
            <HotelList />
          </Route>
          <Route exact path="/confirmBooking">
            <ConfirmBooking />
          </Route>
          <Route exact path="/bill">
            <Bill />
          </Route>
          <Route path="/oldBill">
            <OldBill />
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
          <Route exact path="/admin">
            <AdminDashboard />
          </Route>
          <Route path="">
            <Error404 />
          </Route>
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
