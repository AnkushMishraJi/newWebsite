import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FooterDesktop from "../FooterDesktop";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

import M from "materialize-css";
import  { TabTitle } from '../TitleSetter'; 

const isBrowser = () => typeof window !== "undefined"
const isMobile = isBrowser() ? (window.innerWidth <= 980 ? true : false) :  false;

const HotelList = () => {
  const [hotels, setHotels] = useState();
  const [width, setWidth] = useState(0)
  

  TabTitle("Mera Adda | Hotels");

  useEffect(() => {
    getHotels();
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

  const getHotels = ()=>{
    const date = new Date(localStorage.getItem("bookingDate")).toDateString();
    const totalPersons = localStorage.getItem("totalPersons");
    const girls = localStorage.getItem("girls");
    const isNightParty = localStorage.getItem("isNightParty");
    fetch(
      `/api/hotelList?date=${date}&totalPersons=${totalPersons}&girls=${girls}&isNightParty=${isNightParty}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        // console.log(data);
        // console.log(totalPersons);
      });
  }
  return (
    <>
    <div className="bg-brand">
      <Link to="/" className={isMobile || width <= 980 ? null : 'd-none'}>
        <FontAwesomeIcon
          className="back-arrow waves-effect"
          icon={faArrowLeft}
        />
      </Link>
      <div className={isMobile || width <= 980 ? "brand-logo f-20 my-5   text-center " : "d-none"}>HOTEL LIST</div>
      <Row className={isMobile || width <= 980 ? null : `w-80 mx-auto`}>
      {
      hotels ?
      hotels.map((oneHotel) => {
        const smallPrice = oneHotel.roomSmallData.smallPrice;
        const medPrice = oneHotel.roomMediumData.mediumPrice;
        const largePrice = oneHotel.roomLargeData.largePrice;

        const smallDiscountPrice = oneHotel.roomSmallData.smallDiscountPrice;
        const medDiscountPrice = oneHotel.roomMediumData.mediumDiscountPrice;
        const largeDiscountPrice = oneHotel.roomLargeData.largeDiscountPrice;

        const smallCap = parseInt(oneHotel.roomSmallData.smallCapacity);
        const medCap = parseInt(oneHotel.roomMediumData.mediumCapacity);
        const largeCap = parseInt(oneHotel.roomLargeData.largeCapacity);

        const newtotal = parseInt(localStorage.getItem("totalPersons"));


        var maxPersons;
        if (largeCap) {
          maxPersons = largeCap;
        } else if (medCap) {
          maxPersons = medCap;
        } else {
          maxPersons = smallCap;
        }

        // console.log(newtotal, " is new total");
        // console.log(smallCap, medCap, largeCap);

        const originalPrice = () => {
          if (newtotal <= smallCap) {
            // console.log("small running");
            return smallPrice;
          }
          if (newtotal <= medCap) {
            // console.log("med running");
            return medPrice;
          }
          if (newtotal <= largeCap) {
            // console.log("large running");
            return largePrice;
          }
        };

        const price = () => {
          if (newtotal <= smallCap) {
            // console.log("small running");
            return (smallDiscountPrice ? smallDiscountPrice : smallPrice )
          }
          if (newtotal <= medCap) {
            // console.log("med running");
            return (medDiscountPrice ? medDiscountPrice : medPrice);
          }
          if (newtotal <= largeCap) {
            // console.log("large running");
            return (largeDiscountPrice ? largeDiscountPrice : largePrice);
          }
        };
        if(isMobile || width <= 980 ){
                  return (
                    <Link key={oneHotel._id} key={oneHotel._id} to={"/userHotel/" + oneHotel._id}>
                      <div className="hlist" style={{width:"85%"}}>
                        { oneHotel.mainPic ?
                        <img
                          className="hlist-img"
                          src={oneHotel.mainPic}
                          alt={"hotel" + oneHotel.hotelName}
                        />
                        :
                        <img
                          className="hlist-img"
                          src={`https://res.cloudinary.com/mera-adda/image/upload/v1641935556/hotel%20structure/hotel_charans_plaza/main.jpg`}
                          alt={"hotel" + oneHotel.hotelName}
                        />
                        }
                        <div className="half-card">
                          <h5 className="f-16 font-weight-bolder ">
                            {oneHotel.hotelName}
                          </h5>
                          <h6 className="f-16 font-weight-light">{oneHotel.address}</h6>
                          <div
                            style={{
                              display: "grid ",
                              gridTemplateColumns: " 10fr 1fr 6fr",
                            }}
                          >
                           { originalPrice() != price() ? 
                           <p className='f-14'>Starting from <span className='f-14 discount'style={{textDecoration:'line-through',color:'red'}}>Rs.{originalPrice()}</span><span className='f-16 font-weight-bolder' style={{color:'green'}}>Rs.{price()}</span></p>
                            :
                            <p className='f-14'>Starting from< span className='f-16'> Rs.{price()}</span></p>}
                            <FontAwesomeIcon  icon={faUser} />
                            <h5 className="f-14" style={{ textAlign: "left" }}>
                              Upto {maxPersons} people
                            </h5>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
                else{
                  return(
                        <Col lg="4" md="6" sm="12" key={oneHotel._id}>
                          <Link  to={"/userHotel/" + oneHotel._id} >
                            <div className="hlist my-3" style={{width:"98%"}}>
                              { oneHotel.mainPic ?
                              <img
                                className="hlist-img"
                                src={oneHotel.mainPic}
                                alt={"hotel" + oneHotel.hotelName}
                              />
                              :
                              <img
                                className="hlist-img"
                                src={`https://res.cloudinary.com/mera-adda/image/upload/v1641935556/hotel%20structure/hotel_charans_plaza/main.jpg`}
                                alt={"hotel" + oneHotel.hotelName}
                              />
                              }
                              <div className="half-card">
                                <h5 className="f-16 font-weight-bolder ">
                                  {oneHotel.hotelName}
                                </h5>
                                <h6 className="f-16 font-weight-light">{oneHotel.address}</h6>
                                <div
                                  style={{
                                    display: "grid ",
                                    gridTemplateColumns: " 10fr 1fr 6fr",
                                  }}
                                >
                                  { originalPrice() != price() ? 
                                  <p className='f-14'>Starting from <span className='f-16 discount'style={{textDecoration:'line-through',color:'red'}}>Rs.{originalPrice()}</span><span className='f-18 font-weight-bolder' style={{color:'green'}}>Rs.{price()}</span></p>
                                  :
                                  <p>Starting from< span className='f-16'> Rs.{price()}</span></p>}
                                  <FontAwesomeIcon icon={faUser} />
                                  <h5 className="f-14" style={{ textAlign: "left" }}>
                                    Upto {maxPersons} people
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Col>
                  )
                }


            })
            :
            <Loading />
            }
            </Row>
            <p className="mt-2">.</p>
            <p className="mt-5">.</p>
          </div>
          {
            isMobile || width <= 980 ?
            null
            :
              hotels ?
              <FooterDesktop />
              :
              <FooterDesktop position='fixed' />
          }
          
          </>
        );
      };

export default HotelList;
