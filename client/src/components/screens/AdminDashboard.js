import React,{useState,useEffect} from 'react'
import Swal from "sweetalert2";
import  { TabTitle } from '../TitleSetter'; 


const AdminDashboard = ()=>{
    const [code,setCode] = useState("");
    const [discount,setDiscount] = useState("");
    const [ispercent,setIspercent] = useState(false);
    const [hotelname,setHotelname] = useState("");
    const [dtype,setDtype] = useState("Percent/Flat");
    TabTitle("Mera Adda | Admin Dashboard");
    

    useEffect(() => {
        getHotels();
    },[]);

    const getHotels = ()=>{
        fetch(
          "http://localhost:3000/api/hotelList?date=&totalPersons=1&girls=false&isNightParty=false",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        });
    }

    const PostData = ()=>{
        if(!code || !hotelname || !discount){
            return Swal.fire({
                icon: "warning",
                text: "Please fill all the details!",
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
            });
        }
        console.log(code)
        if(ispercent){
            if(discount<0 && discount>100 ){
                return Swal.fire({
                    icon: "warning",
                    text: "Discount can't be more than 100%",
                    confirmButtonColor: "#fe9124",
                    allowEnterKey: false,
                });
            }
            else{
                Swal.fire({
                    icon: "success",
                    title: "Saved",
                    text: "Coupen added!",
                    confirmButtonColor: "#fe9124",
                    allowEnterKey: false,
                });
            }
        }
        else{
            Swal.fire({
                icon: "success",
                title: "Saved",
                text: "Coupen added!",
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
            });
        }
    }

    return(
        <>
        <div className="container mt-3">
        <div className="row  d-flex mx-auto w-60">
            <h2 className="d-flex mx-auto my-3">Coupon Details</h2>
            <form>
            <div className="col-10 col-mid-4 mt-3">
                <p style={{color: "white"}}>Coupon Code</p>
                <input
                type="text"
                placeholder="example: FIRST50"
                style={{
                    backgroundColor: "white",
                    height: "40px",
                    borderRadius: "0.5em",
                    border: "none",
                }}
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                />
            </div>
            <div className="col-10 col-mid-4 mt-3 ">
                <p style={{color: "white"}}>Hotel</p>
                <select
                onChange={(e) => setHotelname(e.target.value)}
                style={{
                    backgroundColor: "white",
                    height: "40px",
                    borderRadius: "0.5em",
                    border: "none",
                }}
                className="form-select form-select-lg mb-3 w-"
                aria-label=".form-select-lg example"
                >
                    <option defaultValue={"Select Hotel"}>Select Hotel</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className="mx-auto mt-3">
                <label>
                <input type="radio"
                name="discount-type"
                onClick={(e) => {
                setIspercent(true);
                setDtype("Percent")
                }}
                />
                <span className="mt-3 text-light mx-3" id="span-checkbox">Percent Discount</span>
                </label>
                <label>
                <input type="radio"
                name="discount-type"
                onClick={(e) => {
                setIspercent(false);
                setDtype("Flat")
                }}
                />
                <span className="mt-3 text-light" id="span-checkbox">Flat Discount</span>
                </label>
            </div>
            <div className="col-lg-4 col-md-6 mt-3">
                <p style={{color: "white"}}>{`${dtype} Discount`}</p>
                <input
                type="text"
                placeholder="example: 50"
                style={{
                    backgroundColor: "white",
                    height: "40px",
                    borderRadius: "0.5em",
                    border: "none",
                }}
                value={discount}
                onChange={(e) =>
                setDiscount(e.target.value)
                }
                />
            </div>
            <div className="col-10 col-mid-4 mt-3 text-center">
            <button
            type="submit"
            className="text-light w-40 mt-3"
            style={{
                backgroundColor: "#fe9124",
                height: "40px",
                borderRadius: "0.5em",
                border: "none",
            }}
            onClick={PostData}
            >
                Submit
            </button>
            </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default AdminDashboard;