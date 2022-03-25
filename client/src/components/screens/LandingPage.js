import React, { useState, useEffect, useRef } from "react";
import logo from "../../images/logo_ma.png";
import backDrop from "../../images/back-drop.png";
import chips from "../../images/chips.svg";
import drinks from "../../images/drinks.svg";
import lock from "../../images/lock.svg";
import playingCards from "../../images/playingCards.svg";
import recordPlayer from "../../images/recordPlayer.svg";
import custom from "../../images/custom.png";
import arrow_left from "../../images/arrow_right.svg";
import FooterDesktop from "../FooterDesktop";

import bdayArt from "../../images/landingPage/bday_art.png";
import dateNight from "../../images/landingPage/date_night.png";
import brideToBe from "../../images/landingPage/brideToBe.png";
import snackimage from "../../images/chips.jpg";
import unprivacy from "../../images/unmatched_privacy.jpg";
import mv1 from "../../images/mv1.png";
import mv2 from "../../images/mv2.jpg";
import mv3 from "../../images/mv3.png";

import letsparty from "../../images/lets-party.jpg";
import barImage from "../../images/barImage.jpg";
import gamesImage from "../../images/games.jpg";
import musicImage from "../../images/speaker.jpg";
import stag_night from "../../images/landingPage/stag_night.png";
import weekend_night from "../../images/landingPage/weekend_night.png";
import arrowdown from "../../images/arrow_down.svg";
import you from "../../images/landingPage/you.png";
import {Row, Col} from 'react-bootstrap'

import { faChevronCircleDown, faChevronCircleRight , faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player"


import { Carousel } from "react-responsive-carousel";

import { Link } from "react-scroll";
import TextTransition, { presets } from "react-text-transition";
import { useHistory } from "react-router";

import  { TabTitle } from '../TitleSetter'; 
import DesktopNavbar from "../navbarDesktop";
import LayoutMobile from "../LayoutMobile";

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
  const [play, setPlay] = useState(false);
  const [x,setX] = useState("5%");
  const [y,setY] = useState("0px");
  const [showScrollButton,SetShowScrollButoon] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  const videoRef = useRef(null);

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

  useEffect(()=>{
    fetchTestimonial();
  },[])

  const fetchTestimonial = ()=>{
    fetch("/api/testimonial/landing-page",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res)=>res.json())
    .then((data)=>{
      setTestimonials(data);
      console.log(data)
    })
  }

  const scrollHandler = ()=>{
    var elmnt = document.getElementById("content");
    elmnt.scrollIntoView();
  }

  const handleScroll = (direction, id)=>{
    var element = document.getElementById(id);
    if(direction=="left")
    element.scrollLeft = element.scrollLeft - 300;
    else if(direction=="right")
    element.scrollLeft = element.scrollLeft + 300;
  }
  

  const videoSection = ()=>{
    return(
      <div className={`${play ? `pointer` : null}`} style={{position:'relative'}}>
        <video ref={videoRef} onClick={(e)=>{e.target.pause(); setX("5%"); setY("0px"); SetShowScrollButoon(true); setPlay(false)}} width="100%" height="500%"  src="https://gdurl.com/01vL" title="YouTube video player" frameBorder="0" allow="" preload="false">
        </video>
        <div className='text-light' style={{ position:'absolute', top:'40%', left:`${x}`,transitionProperty: x, transitionDuration: '0.8s'}}>
          <p className='f-44 font-weight-bolder line-ht-0'>Private Parties</p>
          <p className="f-20 font-weight-bolder py-2">Customized for you.</p>
          <div className='d-flex align-items-center'>
            <button className='text-light p-2 f-14' onClick={()=>{history.push("/")}} style={{backgroundColor:'#FF3030',border:'none', outline:'none', borderRadius:'6px'}}>Book Now</button>
            <div className='d-flex mx-3 pointer' onClick={()=>{videoRef.current.play(); setX("-30%"); setY("-120px"); SetShowScrollButoon(false); setPlay(true)}}>
              <FontAwesomeIcon
                className='f-18 mx-1'
                style={{ color: 'white' }}
                icon={faChevronCircleRight}
                />
                <p className='my-auto'>Watch Video</p>
              </div>
            </div>
        </div>
        {showScrollButton?
        <>
        <div className='text-light' style={{ position:'absolute', top:'85%', left:'45.5%'}}>
          <p className="f-18 font-weight-bolder mx-auto mb-5">Know More</p>
          <div className="bounce-object" style={{ position:'absolute', left:'40%'}}>
            <img src={arrowdown} onClick={scrollHandler}/>
          </div>
        </div>
        </>
        : null
        }
        
      </div>
    )
  }

  const testiimonialSection = ()=>{
    return(
      <div className='d-flex flex-column mt-5 w-50 px-5 mx-auto' style={{position:'relative'}}>
        <p className='text-light mx-auto f-24'>
          Hear it from our customers!
        </p>
        <img className='pointer' style={{width:'2vw', position:'absolute', top:'50%', left:'0%'}} src={arrow_left} onClick={()=>{handleScroll("left","testimonial-div")}}/>
        <div id="testimonial-div" className='mx-auto text-light d-flex' style={{overflowX:'scroll', maxWidth:'100%', scrollBehavior:'smooth'}}>
          {
            testimonials.map((testimonial)=>{
              return(
                <div style={{minWidth:'33%'}}>
                  <div className='mx-1 p-2' style={{backgroundColor:'#101010'}}>
                    <p className='f-14 mt-2'>
                      {testimonial.content}
                    </p>
                    <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px"}}>
                        <div>
                            <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src={testimonial.picUrl}/>
                        </div>
                        <div>
                            <h6 className="mt-2">{testimonial.name}</h6>
                        </div>
                    </div>
                  </div>
                </div>
              )
            })
            
          
          }
        </div>
        <img className='pointer' style={{width:'2vw', position:'absolute', top:'50%', right:'0%' , transform:'rotate(180deg)'}} src={arrow_left} onClick={()=>{handleScroll("right","testimonial-div")}}/>
      </div>
    )
  }

  const about = () => {
    return(
      <>
      <div className="d-flex align-items-center w-80 pb-5 py-5" id="content">
        <div className='px-5 mx-5'>
          <div>
          	<img className='about-image-shadow-1' src={letsparty}
            alt="about images"
            style={{borderRadius: '8px',width: '500px', height: '300px'}}
            />
          </div>
        </div>
        <div className="mx-5">
          <p className='text-light f-24 font-weight-bolder'>
            Get your parties customised
          </p>
          <p className='f-14 text-light'>
            Need the space decorated we have got the most diversified decoration 
            packages that suit all your needs. From birthdays to anniversary 
            celebrations to bachelorette party. You just name it. We got it.
          </p>
          {/* <div className='d-flex align-items-center'>
            <FontAwesomeIcon
            className='f-18'
            style={{ color: "#0a75ed" }}
            icon={faChevronCircleRight}
            />
            <p className='text-light my-auto mx-2 f-16 font-weight-bolder'>Learn More</p>
          </div> */}
        </div>
      </div>

      <div className="d-flex align-items-center pb-5 w-80 ms-auto py-5">
        <div className="mx-5">
          <p className='text-light f-24 font-weight-bolder'>
            Complimentary Snacks and Drinks
          </p>
          <p className='f-14 text-light'>
            Watch out for tags of premises that offer complimentary snacks for
            parties. It ain't no party without good food. All the listed premises
            got their own kitchen so you get pipin hot food at your beck and call.
          </p>
        </div>
        <div className='px-5 mx-5 ms-auto'>
          <div>
          	<img className='about-image-shadow-2' src={snackimage}
            alt="about images"
            style={{borderRadius: '8px',width: '500px', height: '300px'}}
            />
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center w-80 pb-5 py-5">
        <div className='px-5 mx-5'>
          <div>
          	<img className='about-image-shadow-3' src={musicImage}
            alt="about images"
            style={{borderRadius: '8px',width: '500px', height: '300px'}}
            />
          </div>
        </div>
        <div className="mx-5">
          <p className='text-light f-24 font-weight-bolder'>
            Play your own music
          </p>
          <p className='f-14 text-light'>
          Tired of being forced to listen to those same generic songs at club.
          Why bother listen to your own music. Bluetooth enabled music speakers
          so you can listen to your own taste.
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center w-80 pb-5 ms-auto py-5">
        <div className="mx-5">
          <p className='text-light f-24 font-weight-bolder'>
            Exciting games
          </p>
          <p className='f-14 text-light'>
            Spice up your parties with fun activities. UNO, Playing cards, ball games,
            etc. are provided at venues so that the party keeps kicking. 
          </p>
        </div>
        <div className='px-5 mx-5 ms-auto'>
          <div>
          	<img className='about-image-shadow-4' src={gamesImage}
            alt="about images"
            style={{borderRadius: '8px',width: '500px', height: '300px'}}
            />
          </div>
        </div>
      </div>
      </>
    )
  }

  if(isMobile || width <= 980){
    return (
      <LayoutMobile>
        <video ref={videoRef} onClick={(e)=>{setPlay(!play); {play? e.target.play() : e.target.pause()}}} width="100%" height="500%"  src="https://gdurl.com/01vL" title="YouTube video player" frameBorder="0" allow="" preload="false">
        </video>
        <div className='text-light' style={{width: "400px",marginTop: "50px"}}>
          <p className='f-44 mx-4 line-ht-0' style={{fontWeight: "500"}}>Hangout Rooms</p>
          <p className="f-36 mx-4 py-2" style={{fontWeight: "500"}}>Great Prices</p>
        </div>
        <div className='text-light text-center' style={{marginTop: "10px"}}>
          <p className="f-18 text-centre">Know More</p>
        </div>
        <div className="text-center">
        <FontAwesomeIcon
                className='f-16'
                style={{ color: 'white' }}
                icon={faChevronDown}
                />
        <br/>
        <button className='text-light p-2 f-18 mt-2' onClick={()=>{history.push("/")}} style={{backgroundColor:'#FF3030',border:'none', outline:'none', borderRadius:'8px', width: '340px', height: '50px'}}>Book Now</button>
        </div>
        
        <hr className='mx-auto' style={{width: '311.01px', height: '10px', color: '#FF3030', marginTop: '70px'}} />
        
        <div className='text-light text-center' style={{marginTop: '100px'}}>
          <p className="f-24 text-centre">To much of a hussle to</p>
          <p className="f-24 text-centre">hangout in a hotel room</p>
          <p className="f-24 text-centre">with your friends?</p>
          <p className="f-36 text-centre" style={{marginTop: '40px',fontWeight: '600'}}>We Got You!</p>
        </div>
        
        <hr className='mx-auto' style={{width: '311.01px', height: '10px', color: '#FF3030', marginTop: '70px'}} />

        <div className='text-light text-center'>
        <p className="f-36 text-centre" style={{marginTop: '40px',fontWeight: '500'}}>Our Customers!</p>
        </div>
       
       
        {/* testimonial */}
        <div className='d-flex flex-column mt-5 px-5 mx-auto' style={{position:'relative'}}>
          <div id="testimonial-div" className='mx-auto text-light d-flex' style={{overflowX:'scroll', maxWidth:'100%', scrollBehavior:'smooth'}}>
            {
              testimonials.map((testimonial)=>{
                return(
                  <div style={{minWidth:'50%'}}>
                    <div className='mx-1 p-2' style={{backgroundColor:'#101010'}}>
                      <p className='f-14 mt-2'>
                        {testimonial.content}
                      </p>
                      <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px"}}>
                          <div>
                              <img style={{width:"40px",height:"40px",borderRadius:"80px"}} src={testimonial.picUrl}/>
                          </div>
                          <div>
                              <h6 className="mt-2">{testimonial.name}</h6>
                          </div>
                      </div>
                    </div>
                  </div>
                )
              })
              
            
            }
          </div>
        </div>

        <hr className='mx-auto' style={{width: '311.01px', height: '10px', color: '#FF3030', marginTop: '10px'}} />

        <div className='text-light' style={{marginLeft: '50px'}}>
          <p className="f-36 text-centre" style={{marginTop: '40px',fontWeight: '550'}}>Why Us?</p>
        </div>
        
        
        {/* about */}
        <div className="d-flex flex-column align-items-left pb-5 py-5" id="content">
        <div className='mx-4'>
          <div>
          	<img className='about-image-shadow-5' src={mv1}
            alt="about images"
            style={{borderRadius: '8px',width: '313.75px', height: '203.08px'}}
            />
          </div>
        </div>
        <div className="mx-4 mt-5 text-start">
          <p className='f-32 font-weight-bolder' style={{color: '#FF602E'}}>
            Cut the Crowd
          </p>
          <p className='f-20 text-light'>
            Just you and your friends, no prying eyes, no loud mouths.
          </p>
        </div>
      </div>

      <div className="d-flex flex-column align-items-left pb-5 py-5">
        
        <div className='mx-4 ms-auto'>
          <div>
          	<img className='about-image-shadow-2' src={mv2}
            alt="about images"
            style={{borderRadius: '8px',width: '313.75px', height: '203.08px'}}
            />
          </div>
        </div>
        <div className="mx-4 mt-5 text-end">
          <p className='f-32 font-weight-bolder' style={{color: '#fcff2e'}}>
            Best Prices Always
          </p>
          <p className='f-20 text-light'>
            The best in class prices for party rooms. Nothing comes close
          </p>
        </div>
      </div>

      <div className="d-flex flex-column align-items-left pb-5 py-5">
        <div className='mx-4'>
          <div>
          	<img className='about-image-shadow-1' src={mv3}
            alt="about images"
            style={{borderRadius: '8px',width: '313.75px', height: '203.08px'}}
            />
          </div>
        </div>
        <div className="mx-4 mt-5 text-start">
          <p className='f-32 font-weight-bolder' style={{color: '#0a75ed'}}>
            As comfy as home
          </p>
          <p className='f-20 text-light'>
          Relax, Gossip, have fun ; all within your comfort zone
          </p>
        </div>
      </div>
      <hr className='mx-auto' style={{width: '311.01px', height: '10px', color: '#0a75ed', marginTop: '10px'}} />


        <p></p><br/>
        <p></p><br/>
        <p></p><br/>
      </LayoutMobile>
    );
  }
  else{
    return (
      <>
        <div style={{position:"relative", top:`${y}`, transitionProperty: y, transitionDuration: '0.8s'}}>
          <DesktopNavbar page='landing'/>
        </div>
        <div style={{backgroundColor:'black'}}>
          {videoSection()}
          {testiimonialSection()}
          {about()}
        </div>
        <FooterDesktop/>
      </>
    );
  }
};

export default LandingPage;
