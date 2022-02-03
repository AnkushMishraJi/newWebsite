import React from "react";
import { Spinner } from "react-bootstrap";
import "../../App.css";

const Loading = ()=>{
    return(
        <div  style={{ position:"absolute", top:"40%", left:"50%" , transform:"translate(0%,-50%)", color:"orange"}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading;