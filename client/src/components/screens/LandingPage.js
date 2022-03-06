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
import {Row, Col} from 'react-bootstrap'

import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player"

import { Carousel } from "react-responsive-carousel";

import { Link } from "react-scroll";
import TextTransition, { presets } from "react-text-transition";
import { useHistory } from "react-router";

import  { TabTitle } from '../TitleSetter'; 

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;

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
  const history = useHistory();
  const [width, setWidth] = useState(0);

  TabTitle("Mera Adda | Customized Private Parties");

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      5030 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

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

  const videoSection = ()=>{
    return(
      <div style={{position:'relative'}}>
        <iframe  width="100%" height="500" src="https://gdurl.com/01vL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
          
        </iframe>
        <div className='text-light' style={{ position:'absolute', top:'50%', left:'2%'}}>
            <p className='f-32 font-weight-bolder line-ht-0'>Private Parties</p>
            <p>Customized for you</p>
            <button className='text-light p-2 f-14' style={{backgroundColor:'#FF3030',border:'none', outline:'none', borderRadius:'6px'}}>Book Now</button>
          </div>
      </div>
    )
  }

  const testiimonialSection = ()=>{
    return(
      <div className='d-flex flex-column mt-5 px-5'>
        <p className='text-light mx-auto f-24'>
          Hear it from our customers!
        </p>
        <Row className='w-50 mx-auto text-light'>
          <Col lg='4' md='6' className='mx-1' style={{backgroundColor:'#101010'}}>
            <p className='f-14 mt-2'>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is\
            </p>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px"}}>
                <div>
                    <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src="https://images.unsplash.com/photo-1520183802803-06f731a2059f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div>
                    <h6 className="mt-2">Victor Brimstone</h6>
                </div>
              </div>
          </Col>
          <Col lg='4' md='6' className='mx-1' style={{backgroundColor:'#101010'}}>
            <p className='f-14 mt-2'>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is\
            </p>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px"}}>
                <div>
                    <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src="https://images.unsplash.com/photo-1520183802803-06f731a2059f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div>
                    <h6 className="mt-2">Victor Brimstone</h6>
                </div>
              </div>
          </Col>
          <Col lg='4' md='6' className='mx-1' style={{backgroundColor:'#101010'}}>
            <p className='f-14 mt-2'>
              In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is\
            </p>
            <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px"}}>
                <div>
                    <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src="https://images.unsplash.com/photo-1520183802803-06f731a2059f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div>
                    <h6 className="mt-2">Victor Brimstone</h6>
                </div>
              </div>
          </Col>
        </Row>
      </div>
    )
  }

  const about = () => {
    return(
      <section>
            	<div className="text-center">
            		<hr className="w-25 mx-auto"/>
            	</div>
            	<div className="container">
            		<div className="row my-5">
            			<div className="col-lg-6 col-md-6 col-12 col-xxl-6">
            				<figure>
            					<img src="https://images.unsplash.com/photo-1520183802803-06f731a2059f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
                      alt="about images"
                      style={{borderRadius: '8px',width: '500px', height: '300px',borderRadius: '8px',
                      background: '#5cc0ff',
                      boxshadow:  '27px 27px 0px #4ea3d9'}}
                      />
            				</figure>
            			</div>
            			<div className="col-lg-6 col-md-6 col-12 col-xxl-6 d-flex justify-content-center align-items-start flex-column">
                  <p className='text-light f-24'>
                    Unmatched Privacy
                  </p>
            				<p className='f-16 text-light'>
                      In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is\
                    </p>
            				<button type="button" className="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="right" title="More journeys">Learn More</button>
            			</div>
            		</div>
            		
            	</div>
      </section>
    )
  }

  if(isMobile || width <= 980){
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
  
          <div className="f-24 font-weight-bolder d-flex brand-logo ">
            <TextTransition
              className=" mx-auto"
              text={TEXTS[index % TEXTS.length]}
              springConfig={presets.stiff}
            />
          </div>
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
            onClick={()=>history.push('/')}
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
          <div className="benefits-custom" id="birthday-regular">
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
          <div className="benefits-custom" id="birthday-premium">
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
          <div className="benefits-custom" id="birthday-epic">
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
          <div className="benefits-custom" id="date-night-regular">
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
          <div className="benefits-custom" id="date-night-premium">
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
          <div className="benefits-custom" id="date-night-epic">
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
          <div className="benefits-custom" id="bride-to-be-regular">
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
          <div className="benefits-custom" id="bride-to-be-premium">
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
          <div className="benefits-custom" id="bride-to-be-epic">
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
  }
  else{
    return (
      <>
        <div style={{backgroundColor:'black'}}>
          {videoSection()}
          {testiimonialSection()}
          {about()}
        </div>
      </>
    );
  }
};

export default LandingPage;
