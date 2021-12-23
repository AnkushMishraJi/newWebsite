import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import { Container, DatePicker } from "react-materialize";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo_ma.jpeg";

const Home = () => {
  const newdate = new Date();
  const history = useHistory();
  const [date, setDate] = useState(newdate.toLocaleDateString());
  const [time, setTime] = useState(new Date());
  const [totalPersons, setTotalPersons] = useState(0);
  const [girls, setGirls] = useState(false);

  const searchFilter = () => {
    localStorage.setItem("totalPersons", totalPersons);
    localStorage.setItem("girls", girls);
    localStorage.setItem("bookingDate", date);
    console.log(time.toLocaleTimeString());
    //console.log(isNightParty);
    console.log(time.toLocaleTimeString("en-US").includes("PM"));
    localStorage.setItem("time", time.toLocaleTimeString("en-US"));
    if (time.getHours() >= 18 || time.getHours() < 8) {
      localStorage.setItem("isNightParty", true);
    } else {
      localStorage.setItem("isNightParty", false);
    }

    history.push("/hotelList");
  };

  return (
    <div
      className="d-flex flex-column align-items-center p-5"
      style={{ backgroundColor: "#1a1b41" }}
    >
      <img className="w-20 mb-4" src={logo} alt="Logo" />
      <h5 className="text-light f-16 mb-0">HEY THERE!</h5>
      <h1 className="title_text font-weight-bolder f-32">LET'S PARTY</h1>
      <p className="text-light">When are you coming to party?</p>
      <div
        className="w-70 bg-white d-flex align-items-center"
        style={{ height: "40px" }}
      >
        <DatePicker
          className="ml-2"
          style={{
            border: "none",
            backgroundColor: "white",
            height: "0%",
          }}
          selected={date}
          placeholder="date of party"
          onChange={(date) => {
            var dateWIthoutTime = new Date(date);
            setDate(
              new Date(dateWIthoutTime.setHours(0, 0, 0, 0)).toDateString()
            );
          }}
          value={date}
        />
        <FontAwesomeIcon className="mx-3" icon={faCalendar} />
      </div>
      <div className="w-70 mt-3 bg-light">
        <LocalizationProvider
          style={{ border: "none" }}
          dateAdapter={AdapterDateFns}
        >
          <TimePicker
            value={time}
            onChange={(time) => {
              setTime(time);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className="w-70 d-inline-flex mt-3">
        <p className="p-0 mt-2 mb-0 text-light f-12 w-100">Total Persons</p>
        <input
          style={{ border: "none", height: "15px", width: "60px" }}
          className="p-0 mt-2 f-12 text-center bg-light"
          type="number"
          value={totalPersons}
          onChange={(e) => {
            setTotalPersons(parseInt(e.target.value));
          }}
          min="0"
          max="99"
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
          <span className="mt-1 text-light">Ladies Included?</span>
        </label>
      </div>
      <button
        className="text-light w-70 mt-3"
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
  );
};

export default Home;
