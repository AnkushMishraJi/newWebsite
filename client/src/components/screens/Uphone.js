import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import sign_in from "../../images/login.svg";

const UserPhoneCheck = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSubmitPhone = () => {
    localStorage.setItem("phone", phone);
    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
      return M.toast({
        html: "Please enter a valid phone number",
        classes: "#d32f2f red darken-2",
      });
    }
    fetch("/checknum", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isUser == true) {
          history.push("/usignin");
          localStorage.setItem("phone", data.phoneNumber);
        } else {
          history.push("/usignup");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <>
      <style>{"body { background-color: #1a1b41; }"}</style>

      <div className="">
        <p className="text-center brand-logo f-24 mt-5   ">HEY THERE!</p>
        <div className="imgDot d-flex mx-auto">
          <img
            className="w-20 mb-4 d-flex mx-auto my-auto w-80"
            src={sign_in}
            alt="sign_in_img"
          />
        </div>

        <div className="auth-card input-field">
          <div>
            <input
              className="input-field-name bg-white align-items-center rounded-7 w-60"
              style={{}}
              name="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              className="text-light w-60 mt-3"
              style={{
                backgroundColor: "#fe9124",
                height: "40px",
                borderRadius: "18px",
                border: "none",
              }}
              onClick={onSubmitPhone}
            >
              Sign-in / Sign-up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPhoneCheck;
