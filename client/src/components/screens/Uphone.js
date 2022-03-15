import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import sign_in from "../../images/login.svg";
import Swal from "sweetalert2";
import FooterDesktop from "../FooterDesktop";
import { TabTitle } from "../TitleSetter";
import LayoutHeader from "../LayoutHeader";
import LayoutMobile from "../LayoutMobile";
const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;
const phoneNumber = localStorage.getItem("phone");

const UserPhoneCheck = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [width, setWidth] = useState(0)
  const [name, setName]=useState("")


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

  const closeKeyboard = (event) => {
    if (event.key == "Enter") {
      console.log("Enter");
      document.getElementById("phoneNum").blur();
    }
  };

  useEffect(() => {
    // localStorage.clear();
    localStorage.setItem("activePage", "login");
    fetch(`/api/getname?phoneNumber=${phoneNumber}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data);
        console.log(data);
      });
  }, [phone]);

  const onSubmitPhone = () => {
    localStorage.setItem("phone", phone);
    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Please enter a valid Phone Number",
        confirmButtonColor: "#fe9124",
        allowEnterKey: false,
      });
    }
    fetch("/api/checknum", {
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
        if (data.isUser == true && name != "") {
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
    {isMobile || width <= 980 ? null : <LayoutHeader />}
    <div className={isMobile || width <= 980 ? "h-90" : "w-50 mx-auto mb-5"} style={{marginTop: `${isMobile || width <= 980 ? "0px" : "60px"}`}}>
      <style>{"body { background-color: black; }"}</style>

      <div className="">
        <p className="text-center brand-logo f-24 mt-5   ">HEY THERE!</p>
        <div className="imgDot d-flex mx-auto">
          <img
            className="w-82 mb-4 d-flex mx-auto my-auto "
            src={sign_in}
            alt="sign_in_img"
          />
        </div>

        <div className="auth-card input-field">
          <div>
            <input
              id="phoneNum"
              className={`input-field-name bg-white align-items-center  w-60`}
              style={{ borderRadius: "0.5em" }}
              name="phoneNumber"
              type="number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={closeKeyboard}
            />
            <button
              className="text-light w-60 mt-3"
              style={{
                backgroundColor: "#fe9124",
                height: "40px",
                borderRadius: "0.5em",
                border: "none",
              }}
              onClick={()=>{setTimeout(()=>onSubmitPhone(),0)}}
            >
              Sign-in / Sign-up
            </button>
          </div>
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

export default UserPhoneCheck;
