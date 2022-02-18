import { blue } from '@mui/material/colors'
import { width } from '@mui/system';
import React from 'react'
import { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2";
import M from 'materialize-css'
// import {Link} from 'react-router-dom'



const Admin = () => {

    const history=useHistory()
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")

    const PostData = ()=>{
        if((email=="") && (password=="")){
            return Swal.fire({
             icon: "error",
             title: "Email and password not entered",
             text: "Please enter email and password"
           });
         }
 
           else if ((email != "") && (password == "")){
             return Swal.fire({
              icon: "error",
              title: "password not entered",
              text: "Please enter password"
            });
         }
 
         else if ((email == "") && (password != "")){
             return Swal.fire({
              icon: "error",
              title: "Email not entered",
              text: "Please enter Email"
            });
         } 
        
        else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter correct Email",
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
              });
             
        }
        fetch("/api/getSuperAdmin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                    Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: 'Credentials do not match',
                    confirmButtonColor: "#fe9124",
                    allowEnterKey: false,
                  });
            }
            else{
                Swal.fire({
                    icon: "success",
                    title: "Login successful",
                    text: "Account logged in",
                    confirmButtonColor: "#fe9124",
                    allowEnterKey: false,
                  });
                
            }
        }).catch(err=>{
            console.log(err)
        })
    }

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

   
    return(
        <div className="Admnlogin w-40 mx-auto"  >    
           <p className="text-center brand-logo f-24 mt-5">HI ADMIN</p>
               <div>
               <img src="http://localhost:3000/static/media/login.ff630c39.svg" className="w-82 mb-4 d-flex mx-auto my-auto " alt=""/>
               <br></br>
               </div>
                <div>
            
            <input
           className="w-70 bg-white d-flex align-items-center mx-auto"
           style={{ borderRadius: "0.5em" }}
           name="email"
           type="text"
           placeholder="Enter email"
           value={email}
           onChange={(e)=>{
               setEmail(e.target.value)
           }}
           
           />
           </div>
           <div>          
               <input
           className="w-70 bg-white d-flex align-items-center mx-auto"
           style={{ borderRadius: "0.5em" }}
           name="password"
           type="text"
           placeholder="Enter password"
           value={password}
           onChange={(e)=>{
               setPassword(e.target.value)
           }}
           />
           </div>
               <button
               onClick={()=>{
                   PostData();
                }}
               
               style={{
                  backgroundColor: "#fe9124",
                  height: "40px",
                  borderRadius: "0.5em",
                  border: "none",
                  display:"block",
                  justifyContent:"center"
                }}
                className="w-70 d-flex align-items-center mx-auto"
                 >
               Login
            </button>                          
      </div>
    )
}

export default Admin