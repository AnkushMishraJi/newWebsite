import React,{useState,useEffect} from 'react'
import Swal from "sweetalert2";
import  { TabTitle } from '../TitleSetter'; 


const AdminDashboard = ()=>{
    const [code,setCode] = useState("");
    const [discount,setDiscount] = useState("");
    const [ispercent,setIspercent] = useState(false);
    const [hotelid,setHotelid] = useState("");
    const [dtype,setDtype] = useState("Percent/Flat");
    const [hotels,setHotels] = useState([]);
    TabTitle("Mera Adda | Admin Dashboard");

    useEffect(() => {
        getHotels();
    }, []);

    const getHotels = ()=>{
        fetch(
          "/api/hotelList?date=&totalPersons=1&girls=false&isNightParty=false",
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
        });
    }

    const PostData = ()=>{
        if(!code || !hotelid || !discount){
            return Swal.fire({
                icon: "warning",
                text: "Please fill all the details!",
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
            });
        }
        if(isNaN(discount)){
            return Swal.fire({
                icon: "warning",
                text: "Discount should be in digits!",
                confirmButtonColor: "#fe9124",
                allowEnterKey: false,
            });
        }

        if(ispercent){
            if(discount>100){
                return Swal.fire({
                    icon: "warning",
                    text: "Discount can't be more than 100%",
                    confirmButtonColor: "#fe9124",
                    allowEnterKey: false,
                });
            }
            else{
                fetch("/api/addVoucher", {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        coupon_code: code,
                        hotel_id: hotelid,
                        percent_discount: parseInt(discount),
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        return Swal.fire({
                          icon: "error",
                          title: "ERROR",
                          text: data.error,
                          confirmButtonColor: "#fe9124",
                          allowEnterKey: false,
                        });
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Saved",
                        text: "Coupon Added!",
                        confirmButtonColor: "#fe9124",
                        allowEnterKey: false,
                    });
                    setCode("");
                    setDiscount("");
                    setIspercent(false);
                    setHotelid("");
                    setDtype("Percent/Flat");
                });
            }
        }
        else{
            fetch("/api/addVoucher", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    coupon_code: code,
                    hotel_id: hotelid,
                    flat_discount: parseInt(discount)
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
                      text: "Coupon Added!",
                      confirmButtonColor: "#fe9124",
                      allowEnterKey: false,
                    });
                    setCode("");
                    setDiscount("");
                    setIspercent(false);
                    setHotelid("");
                    setDtype("Percent/Flat");
                }
            });
        }
    }

    return(
        <>
        <div className="container mt-3">
        <div className="row  d-flex mx-auto w-60">
            <h2 className="d-flex mx-auto my-3">Coupon Details</h2>
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
                onClick={(e) => setHotelid(e.target.value)}
                style={{
                    backgroundColor: "white",
                    height: "40px",
                    borderRadius: "0.5em",
                    border: "none",
                }}
                className="form-select form-select-lg mb-3 w-"
                aria-label=".form-select-lg example"
                >
                    {
                        hotels.map( h => 
                        <option key={h._id} value={h._id}>{h.hotelName}</option> )
                    }
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
        </div>
        </div>
        </>
    );
};

export default AdminDashboard;