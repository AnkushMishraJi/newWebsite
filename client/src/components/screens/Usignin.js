import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router";
import sign_in from "../../images/login.svg";

import Swal from "sweetalert2";
import FooterDesktop from "../FooterDesktop";
import { TabTitle } from "../TitleSetter";
import LayoutHeader from "../LayoutHeader";
import LayoutMobile from "../LayoutMobile";

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;


const UserSignin = () => {
  const [otp, setOtp] = useState("");
  const [route, setRoute] = useState();
  const [width, setWidth] = useState(0)
  TabTitle("Mera Adda | Sign In");

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

  useEffect(() => {
    setRoute(localStorage.getItem("route"));
    if (!localStorage.getItem("phone")) {
      return history.push("/uphone");
    }
    Swal.fire({
      icon: "success",
      title: "OTP sent",
      text: "Please check your Phone",
      confirmButtonColor: "#fe9124",
      allowEnterKey: false,
    });
    onSignInSubmit();
  }, []);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone");
    fetch(`/api/getname?phoneNumber=${phoneNumber}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("UserName",data);
      });
  }, []);

  const history = useHistory();

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          // console.log("Captcha verified");
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = (e) => {
    configureCaptcha();
    const phoneNumber = "+91" + localStorage.getItem("phone");
    // console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        // console.log(error);
      });
  };
  const onSubmitOtp = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // console.log(JSON.stringify(user));
        Swal.fire({
          icon: "success",
          title: "OTP matched",
          text: "You are logged in !",
          confirmButtonColor: "#fe9124",
          allowEnterKey: false,
        });
        console.log(JSON.stringify(user.providerId));
        localStorage.setItem("isAuthenticated", "true");
        history.push(route);

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        Swal.fire({
          icon: "error",
          title: "Wrong OTP",
          text: "Please enter correct OTP",
          confirmButtonColor: "#fe9124",
          allowEnterKey: false,
        });
        // ...
      });
  };
  return (
    <>
    {isMobile || width <= 980 ? null : <LayoutHeader />}
      <div className={isMobile || width <= 980 ? null : `w-50 mx-auto mb-5`}>
        <style>{"body { background-color: #1a1b41; }"}</style>
        <p className="brand-logo f-24 text-center mt-5">SUBMIT OTP</p>
        <div className="imgDot d-flex mx-auto">
          <img
            className=" mb-4 d-flex mx-auto my-auto w-82"
            src={sign_in}
            alt="sign_in_img"
          />
        </div>
        <div className="auth-card input-field ">
          <div className="">
            <form onSubmit={onSubmitOtp}>
              <input
                className="w-70 bg-white d-flex align-items-center mx-auto"
                style={{ borderRadius: "0.5em" }}
                name="otp"
                type="text"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="submit"
                className="text-light w-70 mt-3"
                style={{
                  backgroundColor: "#fe9124",
                  height: "40px",
                  borderRadius: "0.5em",
                  border: "none",
                }}
              >
                Submit
              </button>
            </form>
            <div id="sign-in-button"></div>
          </div>
        </div>
      </div>
      <p></p><br/>
      <p></p><br/>
      <p></p><br/>
      <p></p><br/>
      <p></p><br/>
    <footer>
      {
        isMobile || width <= 980 ?
        <LayoutMobile />
        :
        <FooterDesktop position='fixed'/>
      }
    </footer>
    </>
  );
};

export default UserSignin;
