import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";

const FooterDesktop = (props)=>{
    return(
        <>
            <div style={props.position == 'fixed' ? {bottom:"0", position:"fixed", paddingLeft:"10%", paddingRight:"10%"} : {bottom:"0", paddingLeft:"10%", paddingRight:"10%"}} 
            className={`${props.page=='landing' ? `bg-black text-light` : `bg-light`} d-flex justify-content-between w-100 py-4`}>
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