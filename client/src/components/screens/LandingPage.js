import React, { useState, useEffect } from "react";
import logo from "../../images/logo_ma.png";
import backDrop from "../../images/back-drop.png";
import chips from "../../images/chips.svg";
import drinks from "../../images/drinks.svg";
import lock from "../../images/lock.svg";
import playingCards from "../../images/playingCards.svg";
import recordPlayer from "../../images/recordPlayer.svg";

import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Carousel } from "react-responsive-carousel";

import { Link } from "react-scroll";

const LandingPage = () => {
  return (
    <div className="my-4 text-center text-light">
      <img
        className=" mb-2"
        src={logo}
        alt="Logo"
        style={{ width: "3em", height: "3em" }}
      />
      <h2 className="brand-logo f-28 text-light">MERA ADDA</h2>
      <img src={backDrop} alt="back-drop" style={{ width: "100%" }} />
      <div className="overlay ">
        <p className="f-18 font-weight">Private Parties</p>
        <p className="f-18 font-weight">Customised for</p>
        <p className="f-24 font-weight-bolder">You.</p>
        <button
          className=" w-60 font-weight-bolder f-18"
          style={{
            color: "#1a1b41",
            backgroundColor: "#fe9124",
            height: "40px",
            borderRadius: "8px",
            border: "none",

            marginTop: "1.5em",
          }}
        >
          BOOK NOW
        </button>
        <Link to="scrollHere" smooth={true} duration={100}>
          <p className="mt-4">Know More</p>
          <FontAwesomeIcon
            style={{ color: "#fe9124", width: "2em", height: "2em" }}
            icon={faChevronCircleDown}
          />
        </Link>
      </div>
      <div className="mx-auto">
        <p className="brand-logo f-24 mt-5" id="scrollHere">
          {" "}
          The Basics
        </p>
        <div className="benefits mb-3">
          <img
            className=" "
            src={chips}
            alt="Logo"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18">
            Complimentary Snacks and Drinks
          </p>
          <p>Free snacks & drinks put smile on everybody's face.</p>
        </div>
        <div className="benefits mb-3">
          <img
            className="mt-4 "
            src={lock}
            alt="lock"
            style={{ width: "5em", height: "5em" }}
          />
          <p className="font-weight-bolder f-18 mt-4">Unmatched Privacy</p>
          <p>
            Enjoy your parties private, free from prying eyes & loud mouths.
          </p>
        </div>
        <div className="benefits mb-3">
          <img
            className=" "
            src={drinks}
            alt="drinks"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18 mt-3">We set the Bar High</p>
          <p>Complete Bar setup at the Venue!</p>
        </div>
        <div className="benefits mb-3">
          <img
            className=" "
            src={recordPlayer}
            alt="recordPlayer"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18 mt-3">Play your own music</p>
          <p className="px-1">
            BT enabled music speakers so you can listen to your own taste.
          </p>
        </div>
        <div className="benefits mb-3">
          <img
            className=" "
            src={playingCards}
            alt="playingCards"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18 mt-3">Exciting Games</p>
          <p className="px-1">UNO, Playing cards, ball games provided</p>
        </div>
        <p className="brand-logo f-24 mt-5">The Customisables</p>
      </div>
      <Carousel
        dynamicHeight={false}
        showThumbs={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
      >
        <div className="benefits mb-3 " id="bday">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Birthdays</p>
          </div>
        </div>
        <div className="benefits mb-3" id="brideToBe">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Bride to Be</p>
          </div>
        </div>
        <div className="benefits mb-3" id="date_night">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Date Night</p>
          </div>
        </div>
        <div className="benefits mb-3" id="escapes">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">The base pack</p>
          </div>
        </div>
      </Carousel>
      <p>.</p>
      <p>.</p>
    </div>
  );
};

export default LandingPage;
