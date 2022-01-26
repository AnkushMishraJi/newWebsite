import React, { useState, useEffect, useContext } from "react";

const FooterDesktop = ()=>{
    return(
        <>
            <div style={{bottom:"0", position: "fixed", paddingLeft:"10%", paddingRight:"10%"}} className="bg-light d-flex justify-content-between w-100 py-4">
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Support</p>
                    </div>
                    <div style={{lineHeight:"0"}}>
                        <p>FAQs</p>
                        <p>Customer Care</p>
                    </div>
                    
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Policies</p>
                    </div>
                    <div style={{lineHeight:"0"}}>
                        <p>Guest Policy</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Host parties</p>
                    </div>
                    <div style={{lineHeight:"0"}}>
                        <p>Become a</p>
                        <p>member</p>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="font-weight-bolder f-18">Important Links</p>
                    </div>
                    <div style={{lineHeight:"0"}}>
                        <p>Home</p>
                        <p>Services</p>
                        <p>My Bookings</p>
                        <p>User page</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterDesktop;