import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo_ma.png";
import fblogo from "../images/Fb-logo.png";
import twitterlogo from "../images/twitterlogo.png";
import instalogo from "../images/instalogo.png";

const FooterDesktop = (props)=>{
    return(
        <>
            <div style={props.position == 'fixed' ? {bottom:"0", position:"fixed", paddingLeft:"10%", paddingRight:"10%"} : {bottom:"0", paddingLeft:"10%", paddingRight:"10%"}} 
            className={`${props.page=='landing' ? `bg-black text-light` : `bg-light`} d-flex justify-content-between w-100 py-4`}>
                <div className="d-flex">
                    <Link to="/">
                        <img src={logo} alt="Logo" style={{ width: "4em", height: "4em" }}/>
                    </Link>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Support</p>
                    </div>
                    <div>
                        {/* <Link to='/'>
                            <p>FAQs</p>
                        </Link> */}
                        <div>
                            <a href='https://web.whatsapp.com/send?text=Hey&phone=919569736905'>Customer Care</a>
                        </div>
                    </div>
                    
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Policies</p>
                    </div>
                    <div>
                        <div>
                            <a href='/policies.docx'>Terms and Conditions</a>
                        </div>
                        <div>
                            <a href='/policies.docx'>Privacy Policy</a>
                        </div>
                        <div>
                            <a href='/policies.docx'>Refunds & Cancellations</a>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column ">
                    <div>
                        <p className="font-weight-bolder f-18">Contact us</p>
                    </div>
                    <div>
                        <div>
                            <a  href="mailto:meraaddacontact@gmail.com?Subject=Info">meraaddacontact@gmail.com</a>
                        </div>
                        <div>
                            <a href="tel:+919606796005">+91 9569736905</a>
                        </div>
                        <div>
                            <p className='mb-0'>A-91, Shivani Vihar, Kalyanpur, </p>
                            <p>Lucknow, Uttar Pradesh - 226022</p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mx-1">
                            <a href="https://m.facebook.com/Mera-Adda-101860575547637" target="_blank">
                                <img src={fblogo} style={{color: "#FFFFFF"}}/>
                            </a>
                        </div>
                        <div className="mx-1">
                            <a href="https://twitter.com/adda_mera" target="_blank">
                                <img src={twitterlogo} style={{color: "#FFFFFF"}}/>
                            </a> 
                        </div>
                        <div className="mx-1">
                            <a href="">
                                <img src={instalogo} style={{color: "#FFFFFF"}}/>
                            </a>
                        </div> 
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Important Links</p>
                    </div>
                    <div>
                        <Link to='/'>
                            <div>
                                <a>Home</a>
                            </div>
                        </Link>
                        <Link to='/services'>
                            <div>
                                <a>Services</a>
                            </div>
                        </Link>
                        <Link to='/allBookings'>
                            <div>
                                <a>Bookings</a>
                            </div>
                        </Link>
                        <Link to='/userpage'>
                            <div>
                                <a>User page</a>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterDesktop;