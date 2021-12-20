import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import { Container, DatePicker } from "react-materialize";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

const Home = () => {
  const newdate = new Date();
  const history = useHistory();
  const [date, setDate] = useState(new Date());
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
    <>
      <div className="mycard card">
        <div className="auth-card input-field">
          <h5>Party Rooms at great prices</h5>
          <Container>
            <p>Enter Check In Date</p>
            <DatePicker
              style={{
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
          </Container>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <p>Select Time</p>
            <TimePicker
              value={time}
              onChange={(time) => {
                setTime(time);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <p className="p-0 mt-2 mb-0">Total Persons</p>
          <input
            className="p-0 m-0"
            type="number"
            value={totalPersons}
            onChange={(e) => {
              setTotalPersons(parseInt(e.target.value));
            }}
            min="0"
            max="99"
          />
          <div>
            <label>
              <input
                type="checkbox"
                onClick={(e) => {
                  setGirls(!girls);
                  console.log(girls);
                }}
              />
              <span className="mt-1">Ladies Included?</span>
            </label>
          </div>
          <h6>Total No. Of. People = {totalPersons}</h6>
          <a className="waves-effect waves-light btn" onClick={searchFilter}>
            Submit
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
