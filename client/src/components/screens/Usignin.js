import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import M from "materialize-css";
import { useHistory } from "react-router";
import sign_in from "../../images/login.svg";

const UserSignin = () => {
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("phone")) {
      return history.push("/uphone");
    }
    M.toast({
      html: "OTP sent Successfuly",
      classes: "#43a047 green darken-1",
    });
    onSignInSubmit();
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
        M.toast({
          html: "User is verified",
          classes: "#d32f2f green darken-2",
        });
        console.log(JSON.stringify(user.providerId));
        history.push("/");
        localStorage.setItem("isAuthenticated", "true");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  return (
    <>
      <style>{"body { background-color: #1a1b41; }"}</style>
      <p className="brand-logo f-24 text-center mt-5">SUBMIT OTP</p>
      <div className="imgDot d-flex mx-auto">
        <img
          className="w-20 mb-4 d-flex mx-auto my-auto w-80"
          src={sign_in}
          alt="sign_in_img"
        />
      </div>
      <div className="auth-card input-field ">
        <div className="">
          <form onSubmit={onSubmitOtp}>
            <input
              className="w-70 bg-white d-flex align-items-center rounded-7 mx-auto"
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
                borderRadius: "18px",
                border: "none",
              }}
            >
              Submit
            </button>
          </form>
          <div id="sign-in-button"></div>
        </div>
      </div>
    </>
  );
};

export default UserSignin;
