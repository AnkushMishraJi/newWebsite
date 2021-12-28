import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import { Container, DatePicker } from "react-materialize";

function UserSignup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState();

  const PostData = () => {
    console.log(name, email, dob, localStorage.getItem("phone"));

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Invalid Email",
        classes: "#d32f2f red darken-2",
      });
    }
    if (!name || !email || !dob) {
      return M.toast({
        html: "Please enter all fields",
        classes: "#d32f2f red darken-2",
      });
    }
    console.log("btn press");
    fetch("/usignup", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        dob: dob,
        phoneNumber: localStorage.getItem("phone"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem("name", data.name);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({
            html: "Saved Successfuly",
            classes: "#43a047 green darken-1",
          });
          history.push("/usignin");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div>
      <style>{"body { background-color: #1a1b41; }"}</style>
      <div
        className="auth-card input-field"
        style={{ display: "grid", gridGap: "25px" }}
      >
        <h2>Welcome</h2>
        <input
          className="w-70 bg-white d-flex align-items-center rounded-7 mx-auto"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="w-70 bg-white d-flex align-items-center rounded-7 mx-auto"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Container>
          <DatePicker
            className="w-80 bg-white d-flex align-items-center rounded-7 mx-auto"
            placeholder="Date of Birth"
            selected={dob}
            onChange={(dob) => {
              setDob(dob.toDateString());
            }}
            value={dob}
          />
        </Container>
        <a
          className="orange w-75 btn text-light font-weight-bolder  mx-auto rounded-7 "
          onClick={PostData}
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default UserSignup;
