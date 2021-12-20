import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { Container, DatePicker } from "react-materialize";

function UserSignup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());

  useEffect(() => {
    localStorage.clear();
  }, []);

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
        console.log(data);
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
        console.log(err);
      });
  };

  return (
    <div className="mycard card">
      <div className="auth-card input-field">
        <h2>User Sign-up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Container>
          <p className="mb-0 mt-2">Enter Date of Birth</p>
          <DatePicker
            className="mt-0"
            selected={dob}
            onChange={(dob) => {
              setDob(dob);
            }}
            placeholder="Enter Date"
            value={dob.toDateString()}
          />
        </Container>
        <a
          className="waves-effect btn #1976d2 blue darken-2"
          onClick={PostData}
        >
          Submit
        </a>
      </div>
    </div>
  );
}

export default UserSignup;
