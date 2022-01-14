import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
import Swal from "sweetalert2";
function Signin() {
  //comment
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessLoggedIn, setBusinessLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid Email Address",
      });
    }
    localStorage.setItem("email", email);
    // console.log( localStorage.getItem("email"));
    fetch("/api/bsignin", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          //   dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Signed In successfully",
            classes: "#43a047 green darken-1",
          });
          localStorage.setItem("businessLoggedIn", "true");
          localStorage.setItem("email", email);
          history.push("/hoteladmin");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="mycard card">
      <div className="auth-card input-field">
        <h2>Business User Sign-in</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // console.log(setPassword);
          }}
        />
        <button
          className="btn waves-effect waves-light #1e88e5 blue darken-1"
          onClick={(e) => {
            PostData();
          }}
        >
          Submit
        </button>
        <h6>
          <Link to="/bsignup">Don't have an account? Create One</Link>
        </h6>
      </div>
    </div>
  );
}

export default Signin;
