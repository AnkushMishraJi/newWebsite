import { blue } from '@mui/material/colors'
import { width } from '@mui/system';
import React from 'react'
import { useState } from 'react'
import Swal from "sweetalert2";
// import {Link} from 'react-router-dom'



function Login (){

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

   function loginbutton(){
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
    }
    return(
        <div className="Admnlogin w-40 mx-auto"  >  

        
           <p class="text-center brand-logo f-24 mt-5">HI ADMIN</p>
               <div>
               <img src="http://localhost:3000/static/media/login.ff630c39.svg" class="w-82 mb-4 d-flex mx-auto my-auto " alt=""/>
               <br></br>
               </div>
            <form>
                <div>
            
            <input
           className="w-70 bg-white d-flex align-items-center mx-auto"
           style={{ borderRadius: "0.5em" }}
           name="email"
           type="text"
           placeholder="Enter email"
           value={email}
           onChange={(e)=>{
               setEmail(e.target.value);
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
               <button   type='Submit'
               onClick={loginbutton}
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
            </form>
               
      </div>
    )
}

export default Login