import React, { useEffect, useState, useReducer } from "react";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import { Container } from "react-materialize";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

function UserSignup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState();

  const closeKeyboard = (event) => {
    if (event.key == "Enter") {
      document.getElementById("name").blur();
      document.getElementById("email").blur();
    }
  };

  const PostData = () => {
    console.log(name, email, dob, localStorage.getItem("phone"));

    if (!name || !email || !dob) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter all fields",
        confirmButtonColor: "#fe9124",
        allowEnterKey: false,
      });
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid Email Address",
        confirmButtonColor: "#fe9124",
        allowEnterKey: false,
      });
    }
    console.log("btn press");
    fetch("/api/usignup", {
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
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Saved",
            text: "Welcome to the family!",
            confirmButtonColor: "#fe9124",
            allowEnterKey: false,
          });
          history.push("/usignin");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
          confirmButtonColor: "#fe9124",
          allowEnterKey: false,
        });
      });
  };

  const onDatepickerRef = (el) => {
    if (el && el.input) {
      el.input.readOnly = true;
    }
  };
  return (
    <div>
      <div className="mx-auto" style={{ display: "grid", gridGap: "25px" }}>
        <Link to="/uphone">
          <FontAwesomeIcon className="back-arrow" icon={faArrowLeft} />
        </Link>
        <h2 className="text-center mt-3">Welcome !</h2>
        <div className="container-input ps-2 mx-auto">
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyPress={closeKeyboard}
          />
        </div>

        <div className="container-input ps-2  mx-auto">
          <input
            id="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyPress={closeKeyboard}
          />
        </div>

        <div className="container-input mx-auto">
          <Container>
            <DatePicker
              selected={dob}
              value={dob}
              onClick={(dob) => {
                setDob(dob);
              }}
              onChange={(dob) => {
                setDob(dob);
              }}
              dateFormat="dd-MMM-yyyy"
              minDate={new Date()}
              ref={(el) => onDatepickerRef(el)}
              placeholderText="Enter Date of Birth"
            />
          </Container>
        </div>

        <a
          className="text-light w-70 mt-5 mx-auto text-center pt-2 font-weight-bolder"
          style={{
            backgroundColor: "#fe9124",
            height: "40px",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={PostData}
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default UserSignup;
