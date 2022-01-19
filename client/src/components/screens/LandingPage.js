import React, { useState, useEffect } from "react";
import logo from "../../images/logo_ma.png";
import backDrop from "../../images/back-drop.png";
import chips from "../../images/chips.svg";
import drinks from "../../images/drinks.svg";
import lock from "../../images/lock.svg";
import playingCards from "../../images/playingCards.svg";
import recordPlayer from "../../images/recordPlayer.svg";
import custom from "../../images/custom.png";

import bdayArt from "../../images/landingPage/bday_art.png";
import dateNight from "../../images/landingPage/date_night.png";
import brideToBe from "../../images/landingPage/brideToBe.png";
import stag_night from "../../images/landingPage/stag_night.png";
import weekend_night from "../../images/landingPage/weekend_night.png";
import you from "../../images/landingPage/you.png";

import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Carousel } from "react-responsive-carousel";

import { Link } from "react-scroll";
import TextTransition, { presets } from "react-text-transition";

const LandingPage = () => {
  const TEXTS = [
    "You",
    "Birthdays",
    "Date Night",
    "Bride to Be",
    "Stag Night",
    "Weekend Soiree",
  ];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      5030 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className=" text-center text-light">
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        showArrows={false}
        interval={5000}
        autoPlay={true}
        animationHandler={"fade"}
        swipeable={false}
        id="mains"
      >
        <div className="land-slide mb-3 ">
          <img src={you} alt="" />
        </div>
        <div className="land-slide mb-3 ">
          <img src={bdayArt} alt="" />
        </div>
        <div className="land-slide mb-3 ">
          <img src={dateNight} alt="" />
        </div>
        <div className="land-slide mb-3 ">
          <img src={brideToBe} alt="" />
        </div>
        <div className="land-slide mb-3 ">
          <img src={stag_night} alt="" />
        </div>
        <div className="land-slide mb-3 ">
          <img src={weekend_night} alt="" />
        </div>
      </Carousel>
      <div className="logo-and-name">
        <img
          className=" mb-2"
          src={logo}
          alt="Logo"
          style={{ width: "3em", height: "3em" }}
        />

        <h2 className="brand-logo f-28 text-light">MERA ADDA</h2>
      </div>
      <div className="landing-page-counter text-light ">
        <p className="f-18 font-weight">Private Parties</p>
        <p className="f-18 font-weight">Customised for</p>

        <p className="f-24 font-weight-bolder d-flex brand-logo ">
          <TextTransition
            className=" mx-auto"
            text={TEXTS[index % TEXTS.length]}
            springConfig={presets.stiff}
          />
        </p>
      </div>

      <div className=" ">
        <button
          className=" w-60 font-weight-bolder f-18"
          style={{
            position: "absolute",
            color: "#1a1b41",
            backgroundColor: "#fe9124",
            height: "40px",
            borderRadius: "8px",
            border: "none",
            top: "62vh",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: 400,
          }}
        >
          BOOK NOW
        </button>
        <Link to="scrollHere" smooth={true} duration={100}>
          <p className="mt-3">Know More</p>
          <FontAwesomeIcon
            style={{ color: "#fe9124", width: "2em", height: "2em" }}
            icon={faChevronCircleDown}
          />
        </Link>
      </div>
      <div className="mx-auto">
        <p className="brand-logo f-24 mt-5" id="scrollHere">
          {" "}
          Why Us?
        </p>
        <div className="benefits">
          <img
            className=" "
            src={custom}
            alt="Logo"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18">Unprecedented Customisation</p>
          <p>Have it your way</p>
        </div>
        <div className="benefits">
          <img
            className=" "
            src={chips}
            alt="Logo"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18">
            Complimentary Snacks and Drinks
          </p>
          <p>Free snacks put smile on everybody's face.</p>
        </div>
        <div className="benefits">
          <img
            className="mt-4 "
            src={lock}
            alt="lock"
            style={{ width: "5em", height: "5em" }}
          />
          <p className="font-weight-bolder f-18 ">Unmatched Privacy</p>
          <p>
            Enjoy your parties private, free from prying eyes & loud mouths.
          </p>
        </div>
        <div className="benefits">
          <img
            className=" "
            src={drinks}
            alt="recordPlayer"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18 mt-3">We set the bar high</p>
          <p className="px-1">Complete bar setup at the venue</p>
        </div>
        <div className="benefits">
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
        <div className="benefits">
          <img
            className=" "
            src={playingCards}
            alt="playingCards"
            style={{ width: "8em", height: "8em" }}
          />
          <p className="font-weight-bolder f-18 mt-3">Exciting Games</p>
          <p className="px-1">UNO, Playing cards, ball games provided</p>
        </div>
      </div>
      <p className="brand-logo f-24 mt-5">The Customisables</p>
      <a className="font-weight-bolder f-18  my-auto" href="tel:9569736905">
        For customisation & help call at Customer Care (+91-9569736905)
      </a>

      <p className="brand-logo f-18 mt-2">Speakers</p>
      <Carousel
        dynamicHeight={false}
        showThumbs={false}
        infiniteLoop={false}
        showIndicators={false}
        showStatus={false}
        className="mb-5"
        swipeScrollTolerance={50}
        preventMovementUntilSwipeScrollTolerance={true}
        centerMode={true}
        centerSlidePercentage={80}
        showArrows={false}
      >
        <div className="benefits-custom" id="zebronics">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Zebronics</p>
            <p className="font-weight-bolder f-16 my-auto">Complimentary</p>
          </div>
        </div>
        <div className="benefits-custom" id="iball">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Iball</p>
            <p className="font-weight-bolder f-16 my-auto">Rs 250</p>
          </div>
        </div>
        <div className="benefits-custom" id="jbl">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">JBL Flip 4</p>
            <p className="font-weight-bolder f-16 my-auto">Rs 500</p>
          </div>
        </div>
        <div className="benefits-custom" id="partybox">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Party Boombox</p>
            <p className="font-weight-bolder f-16 my-auto">Rs 1500</p>
          </div>
        </div>
      </Carousel>
      <p className="brand-logo f-18 mt-2">Decorations</p>
      <Carousel
        dynamicHeight={false}
        showThumbs={false}
        infiniteLoop={false}
        showIndicators={false}
        showStatus={false}
        className="mb-5"
        swipeScrollTolerance={50}
        preventMovementUntilSwipeScrollTolerance={true}
        centerMode={true}
        centerSlidePercentage={80}
        showArrows={false}
      >
        <div className="benefits-custom" id="bday1">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Birthday</p>
            <p className="font-weight-bolder f-14 my-auto">Regular</p>
            <p className="f-14 my-auto text-start px-2">100 Baloons</p>
            <p className="f-14 my-auto text-start px-2">1 Birthday Foil</p>
            <p className="f-14 my-auto text-start px-2">2 Curtains</p>
            <p className="f-14 my-auto text-start px-2">2 Foil Baloons</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 1000</p>
          </div>
        </div>
        <div className="benefits-custom" id="bday2">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Birthday</p>
            <p className="font-weight-bolder f-14 my-auto">Premium</p>
            <p className="f-14 my-auto text-start px-2">200 Baloons</p>
            <p className="f-14 my-auto text-start px-2">1 Birthday Foil</p>
            <p className="f-14 my-auto text-start px-2">2 Curtains</p>
            <p className="f-14 my-auto text-start px-2">4 Foil Baloons</p>
            <p className="f-14 my-auto text-start px-2">1 Fairy Light</p>
            <p className="f-14 my-auto text-start px-2">12 Hanging Photos</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 1500</p>
          </div>
        </div>
        <div className="benefits-custom" id="bday3">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Birthday</p>
            <p className="font-weight-bolder f-14 my-auto">Epic</p>
            <p className="f-14 my-auto text-start px-2">300 Baloons</p>
            <p className="f-14 my-auto text-start px-2">1 Birthday Foil</p>
            <p className="f-14 my-auto text-start px-2">1 Name Foil</p>
            <p className="f-14 my-auto text-start px-2">2 Curtains</p>
            <p className="f-14 my-auto text-start px-2">4 Foil Baloons</p>
            <p className="f-14 my-auto text-start px-2">1 Fairy Light</p>
            <p className="f-14 my-auto text-start px-2">12 Hanging Photos</p>
            <p className="f-14 my-auto text-start px-2">1 Kg Rose Petals</p>
            <p className="f-14 my-auto text-start px-2">12 Candles LED</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 2000</p>
          </div>
        </div>
        <div className="benefits-custom" id="date-night1">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Date Night</p>
            <p className="font-weight-bolder f-14 my-auto">Regular</p>
            <p className="f-14 my-auto text-start px-2">100 Baloons</p>
            <p className="f-14 my-auto text-start px-2">1 Love Foil</p>
            <p className="f-14 my-auto text-start px-2">2 Foil Baloons</p>
            <p className="f-14 my-auto text-start px-2">12 Candles LED</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 1000</p>
          </div>
        </div>
        <div className="benefits-custom" id="date-night2">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Date Night</p>
            <p className="font-weight-bolder f-14 my-auto">Premium</p>
            <p className="f-14 my-auto text-start px-2">
              200 Baloons & Ribbons
            </p>
            <p className="f-14 my-auto text-start px-2">1 Love Foil</p>

            <p className="f-14 my-auto text-start px-2">2 Foil Baloons</p>

            <p className="f-14 my-auto text-start px-2">24 Candles LED</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 1500</p>
          </div>
        </div>
        <div className="benefits-custom" id="date-night3">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Date Night</p>
            <p className="font-weight-bolder f-14 my-auto">Epic</p>
            <p className="f-14 my-auto text-start px-2">
              300 baloons & ribbons
            </p>
            <p className="f-14 my-auto text-start px-2">1 Love Foil</p>

            <p className="f-14 my-auto text-start px-2">4 Foil Baloons</p>

            <p className="f-14 my-auto text-start px-2">40 Candles LED</p>
            <p className="f-14 my-auto text-start px-2">1 Kg Rose Petal</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 2000</p>
          </div>
        </div>
        <div className="benefits-custom" id="brideToBe1">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Bride to Be</p>
            <p className="font-weight-bolder f-14 my-auto">Regular</p>
            <p className="f-14 my-auto text-start px-2">
              100 baloons & ribbons
            </p>
            <p className="f-14 my-auto text-start px-2">1 bride to be foil</p>
            <p className="f-14 my-auto text-start px-2">2 Curtains</p>
            <p className="f-14 my-auto text-start px-2">2 foil baloons</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 1000</p>
          </div>
        </div>
        <div className="benefits-custom" id="brideToBe2">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Bride to Be</p>
            <p className="font-weight-bolder f-14 my-auto">Premium</p>
            <p className="f-14 my-auto text-start px-2">
              200 baloons & ribbons
            </p>
            <p className="f-14 my-auto text-start px-2">1 bride to be foil</p>
            <p className="f-14 my-auto text-start px-2">2 Curtains</p>
            <p className="f-14 my-auto text-start px-2">4 foil baloons</p>
            <p className="f-14 my-auto text-start px-2">12 Hanging Photos</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 1500</p>
          </div>
        </div>
        <div className="benefits-custom" id="brideToBe3">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Bride to Be</p>
            <p className="font-weight-bolder f-14 my-auto">Epic</p>
            <p className="f-14 my-auto text-start px-2">
              300 baloons & ribbons
            </p>
            <p className="f-14 my-auto text-start px-2">1 bride to be foil</p>
            <p className="f-14 my-auto text-start px-2">2 Curtains</p>
            <p className="f-14 my-auto text-start px-2">8 foil baloons</p>
            <p className="f-14 my-auto text-start px-2">1 fairy light</p>
            <p className="f-14 my-auto text-start px-2">12 Hanging Photos</p>
            <p className="f-14 my-auto text-start px-2">12 Candles LED</p>
            <p className="font-weight-bolder f-18 my-auto">Rs. 3000</p>
          </div>
        </div>
        <div className="benefits-custom" id="custom">
          <div className="tape">
            <p className="font-weight-bolder f-18 my-auto">Custom</p>

            <p className="f-14 my-auto text-start px-2">
              If you can think it we can do it!
            </p>
          </div>
        </div>
      </Carousel>
      <p>.</p>
      <p>.</p>
    </div>
  );
};

export default LandingPage;
