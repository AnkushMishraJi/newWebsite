import React, { useState, useEffect, useRef } from "react";
import FooterDesktop from "../FooterDesktop";

import Swal from 'sweetalert2';

import  { TabTitle } from '../TitleSetter'; 
import DesktopNavbar from "../navbarDesktop";

const CreateTesrimonial = () => {
  
  const [name, setName] = useState("");
  const [picUrl, setURL] = useState("");
  const [content, setContent] = useState("");

  const PostData = () => {
    fetch("/api/create/testimonial/landing-page", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            picUrl,
            content
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: data.error,
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
            });
            } else {
            Swal.fire({
                icon: "success",
                title: "Saved",
                text: "Testimonial Created Successfully",
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
            });
            }
        });
        setName("");
        setURL("");
        setContent("");
  }

  const inputTestimonial = () => {
    return(
        <>
        <div className="d-flex dflex-column">
            <div className="container">
            <div className="row">
                <h2 className="text-center mt-3 py-5" style={{color: "#fe9124"}}>Add Testimonial</h2>
                
                <div className="col-md-12 col-10 col-xxl-12 mx-auto">
                    <div className="mx-auto w-60">
                        <h3 style={{color: "#fe9124"}}>Name :</h3>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            style={{background: "white", borderRadius: "6px"}}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                
                <div className="col-md-12 col-10 col-xxl-12 mx-auto">
                    <div className="mx-auto w-60">
                        <h3 style={{color: "#fe9124"}}>Profile Pic :</h3>
                        <input
                            id="url"
                            type="text"
                            placeholder="Picture Url"
                            value={picUrl}
                            style={{background: "white", borderRadius: "6px"}}
                            onChange={(e) => {
                                setURL(e.target.value);
                            }}
                        />
                    </div>
                </div>
                
                <div className="col-md-12 col-10 col-xxl-12 mx-auto">
                    <div className="mx-auto w-60">
                        <h3 style={{color: "#fe9124"}}>Feedback :</h3>
                        <textarea
                        id="myBox"
                        placeholder="ENTER DISCRIPTION"
                        value={content}
                        style={{background: "white", borderRadius: "6px", height: "200px"}}
                        onChange={(e)=>{
                            setContent(e.target.value);
                        }}></textarea>
                    </div>
                </div>

                <div className="col-md-12 col-10 col-xxl-12 mx-auto text-center">
                    <botton className="btn waves-effect bg-orange font-weight-bolder px-2"
                    onClick={(e) => PostData()}
                    style={{width: "140px",height: "45px"}}>
                        Submit
                    </botton>
                </div>
            </div>
            </div>
        
        </div>
        </>
    )
  }

  TabTitle("Mera Adda | Create Testimonial");


    return (
      <>
        <div style={{backgroundColor:'black'}}>
          {inputTestimonial()}
        </div>
        <FooterDesktop/>
      </>
    );
};

export default CreateTesrimonial;
