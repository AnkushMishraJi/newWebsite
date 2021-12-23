import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const UserPhoneCheck = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSubmitPhone = () => {
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
        // console.log(data);
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
      <div className="mycard card">
        <div className="auth-card input-field">
          <h2>User Sign-in</h2>
          <div>
            <div id="sign-in-button"></div>
            <input
              name="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={onSubmitPhone}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPhoneCheck;
