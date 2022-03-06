import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

import logo from "../../images/logo_ma.png";
import FooterDesktop from "../FooterDesktop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  { TabTitle } from '../TitleSetter'; 
import LayoutHeader from "../LayoutHeader";
import LayoutMobile from "../LayoutMobile";

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;

const Home = () => {
  const newdate = new Date();
  const history = useHistory();

  

  
  const [totalPersons, setTotalPersons] = useState(0);
  const [girls, setGirls] = useState(false);
  const [width, setWidth] = useState(0)

  const currTime = new Date();
  const [date, setDate] = useState(currTime.getHours()>20 ? new Date(currTime.getFullYear(),currTime.getMonth(),currTime.getDate()+1):new Date());
  const [time, setTime] = useState(new Date());
  TabTitle("Mera Adda | Book Now");

  useEffect(() => {
    if (isBrowser()) {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    localStorage.setItem("activePage", "home");
  }, []);

  useEffect(() => {
    personCheck();
  }, [totalPersons]);

  useEffect(()=>{
    {time.getHours()==currTime.getHours() && currTime.getHours()>=6 && currTime.getHours()<20 ? setTime(new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes())) : time.getHours()==currTime.getHours() && (currTime.getHours()<6 || currTime.getHours()>=20) ? setTime(new Date(0,0,0,10,0)) : setTime(time)}
    {currTime.getHours()>19 ? setDate(new Date(currTime.getFullYear(),currTime.getMonth(),currTime.getDate()+1)):setDate(new Date())}
  },[])

  const searchFilter = () => {
    localStorage.setItem("totalPersons", totalPersons);
    localStorage.setItem("girls", girls);
    localStorage.setItem("bookingDate", date);
    localStorage.setItem("time", time);
    if (time.getHours() >= 18 || time.getHours() < 8) {
      localStorage.setItem("isNightParty", true);
      localStorage.setItem("type", "Night Party");
    } else {
      localStorage.setItem("isNightParty", false);
      localStorage.setItem("type", "Day Party");
    }
    localStorage.removeItem("activePage");

    history.push("/hotelList");
  };

  const personCheck = () => {
    if (totalPersons < 1) {
      setTotalPersons(1);
    } else if (totalPersons > 50) {
      setTotalPersons(50);
    }
  };

  const onDatepickerRef = (el) => {
    if (el && el.input) {
      el.input.readOnly = true;
    }
  };

  const closeKeyboard = (event) => {
    if (event.key == "Enter") {
      console.log("Enter");
      document.getElementById("tp").blur();
    }
  };



  if(isMobile || width <= 980){
    return (
      <LayoutMobile>
      <div
        className="d-flex flex-column align-items-center p-4 bg-brand"
        style={{ height: "100%", height: "90vh" }}
      >
        <img
          className=" mb-4"
          src={logo}
          alt="Logo"
          style={{ width: "5em", height: "5em" }}
        />
        <h5 className="text-light font-weight-bolder f-18 mb-0 brand-logo">
          HEY THERE!
        </h5>
        <h1 className="title_text font-weight-bolder f-32 brand-logo">
          LET'S PARTY
        </h1>
        <p className="text-light">When are you coming to party?</p>
        <div className="container-input mt-3 w-70">
          <DatePicker
            className="px-3"
            selected={date}
            onClick={(date) => {
              setDate(date);
            }}
            onChange={(date) => {
              setDate(date);
            }}
            value={date}
            dateFormat="dd-MMM-yyyy"
            minDate={currTime.getHours()>19 ? new Date(currTime.getFullYear(),currTime.getMonth(),currTime.getDate()+1):new Date()}
            ref={(el) => onDatepickerRef(el)}
          />
        </div>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={time.getHours()==currTime.getHours() && currTime.getHours()>=6 && currTime.getHours()<20 ? new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes()) : time.getHours()==currTime.getHours() && ( currTime.getHours()<6 || currTime.getHours()>19 ) ? new Date(0,0,0,10,0) : time}
              onChange={(time) => {
                setTime(time);
              }}
              renderInput={(params) => (
                <TextField
                className="timepicker bg-light w-70 mt-2"
                  {...params}
                />
                
              )}
              minTime={currTime.getDate() == date.getDate() && currTime.getHours()>=6 && currTime.getHours()<20 ?  new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes()) : new Date(0,0,0,10,0)}
              
              />
          </LocalizationProvider>
  
        <div className="w-70 d-inline-flex mt-3">
          <p className="pt-2 mt-2 mb-0 text-light f-18 w-100 ">Total Persons</p>
          <input
            id="tp"
            className="tp-box"
            type="number"
            value={totalPersons}
            onChange={(e) => {
              setTotalPersons(parseInt(e.target.value));
            }}
            min="0"
            max="99"
            onKeyPress={closeKeyboard}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onClick={(e) => {
                setGirls(!girls);
                console.log(girls);
              }}
            />
  
            <span className="mt-2 text-light">Ladies Included?</span>
          </label>
        </div>
        <button
          className="text-light w-70 mt-4 font-weight-bolder"
          style={{
            backgroundColor: "#fe9124",
            height: "40px",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={searchFilter}
        >
          GO!
        </button>
      </div>
      </LayoutMobile>
    );
  }
  else{
    return(
      <>
      <LayoutHeader>
        <div className="d-flex flex-column mt-5">
          <div className="mx-auto">
            <p className="f-36 font-weight-bold text-light">When are you coming to party?</p>
          </div>
          <div className="d-flex mx-auto">
            <div className="container-input mt-3 mx-3">
              <DatePicker className="px-3" selected={date} onClick={(date) => {setDate(date);}} onChange={(date) => {setDate(date);}}
                value={date}
                dateFormat="dd-MMM-yyyy"
                minDate={currTime.getHours()>20 ? new Date(currTime.getFullYear(),currTime.getMonth(),currTime.getDate()+1):new Date()}
                ref={(el) => onDatepickerRef(el)}
              />
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={time.getHours()==currTime.getHours() && currTime.getHours()>=6 && currTime.getHours()<20 ? new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes()) : time.getHours()==currTime.getHours() && ( currTime.getHours()<6 || currTime.getHours()>20 ) ? new Date(0,0,0,10,0) : time}
                onChange={(time) => {
                  setTime(time);
                }}
                renderInput={(params) => (
                  <TextField
                  className="timepicker bg-light mt-3"
                    {...params}
                  />
                )}
                minTime={currTime.getDate() == date.getDate() && currTime.getHours()>=6 ?  new Date(0,0,0,currTime.getHours()+4,currTime.getMinutes()) : new Date(0,0,0,10,0)}
              />
            </LocalizationProvider>
            <input id="tp" className="tp-box mt-3 mx-3" type="number" value={totalPersons}
              onChange={(e) => {
                setTotalPersons(parseInt(e.target.value));
              }}
              min="0"
              max="99"
              onKeyPress={closeKeyboard}
            />
            <button className="text-light px-5 mt-3 mb-2 font-weight-bolder"
              style={{
                backgroundColor: "#fe9124",
                borderRadius: "8px",
                border: "none",
              }}
              onClick={searchFilter}
            >
              GO!
            </button>
          </div>
          <div className="mx-auto mt-3">
            <label>
              <input type="checkbox"
                onClick={(e) => {
                  setGirls(!girls);
                  console.log(girls);
                }}
              />
              <span className="mt-3 text-light" id="span-checkbox">Ladies Included?</span>
            </label>
          </div>
        </div>
        </LayoutHeader>
        <FooterDesktop position='fixed'/>
      </>
    )
  }
}


  

export default Home;
