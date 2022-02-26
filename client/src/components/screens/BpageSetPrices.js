import React, {useState,useEffect} from 'react';
import Swal from 'sweetalert2';

const SetPrices = () => {
    const [smallPrice, setSmallPrice] = useState("");
    const [smallDiscountPrice, setSmallDiscountPrice] = useState("");
    const [smallNightPrice, setSmallNightPrice] = useState("");
    const [smallNightDiscountPrice, setSmallNightDiscountPrice] = useState("");
    const [mediumPrice, setMediumPrice] = useState("");
    const [mediumDiscountPrice, setMediumDiscountPrice] = useState("");
    const [mediumNightPrice, setMediumNightPrice] = useState("");
    const [mediumNightDiscountPrice, setMediumNightDiscountPrice] = useState("");
    const [largePrice, setLargePrice] = useState("");
    const [largeDiscountPrice, setLargeDiscountPrice] = useState("");
    const [largeNightPrice, setLargeNightPrice] = useState("");
    const [largeNightDiscountPrice, setLargeNightDiscountPrice] = useState("");

    useEffect(() => {
      fetch(`/api/userHotel/${localStorage.getItem("b_id")}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSmallPrice(data[0].roomSmallData.smallPrice);
          setSmallDiscountPrice(data[0].roomSmallData.smallDiscountPrice);
          setSmallNightPrice(data[0].roomSmallData.smallNightPrice);
          setSmallNightDiscountPrice(data[0].roomSmallData.smallNightDiscountPrice);
          
          setMediumPrice(data[0].roomMediumData.mediumPrice);
          setMediumDiscountPrice(data[0].roomMediumData.mediumDiscountPrice);
          setMediumNightPrice(data[0].roomMediumData.mediumNightPrice);
          setMediumNightDiscountPrice(data[0].roomMediumData.mediumNightDiscountPrice);
          
          setLargePrice(data[0].roomLargeData.largePrice);
          setLargeDiscountPrice(data[0].roomLargeData.largeDiscountPrice);
          setLargeNightPrice(data[0].roomLargeData.largeNightPrice);
          setLargeNightDiscountPrice(data[0].roomLargeData.largeNightDiscountPrice);
        });
    }, []);

    return (
        <div>
          <div className="mx-auto" style={{ display: "grid", gridGap: "25px" }}>
            <h2 className="text-center mt-3">Set/Update Prices</h2>
            
            <div className="container">
                <div className="row gy-2 my-5">
                  <div className="col-md-4 col-10 col-xxl-4 mx-auto">
                    <h3 className="text-center mt-3">Small Room Data</h3>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Small Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Small Price"
                        value={smallPrice}
                        onChange={(e) => {
                          setSmallPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Small Discount Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Small Discount Price"
                        value={smallDiscountPrice}
                        onChange={(e) => {
                          setSmallDiscountPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Small Night Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Small Night Price"
                        value={smallNightPrice}
                        onChange={(e) => {
                          setSmallNightPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Small Night Discount Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Small Night Discount Price"
                        value={smallNightDiscountPrice}
                        onChange={(e) => {
                          setSmallNightDiscountPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-10 col-xxl-4 mx-auto">
                    <h3 className="text-center mt-3">Medium Room Data</h3>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Medium Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Medium Price"
                        value={mediumPrice}
                        onChange={(e) => {
                          setMediumPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Medium Discount Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Medium Discount Price"
                        value={mediumDiscountPrice}
                        onChange={(e) => {
                          setMediumDiscountPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Medium Night Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Medium Night Price"
                        value={mediumNightPrice}
                        onChange={(e) => {
                          setMediumNightPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Medium Night Discount Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Medium Night Discount Price"
                        value={mediumNightDiscountPrice}
                        onChange={(e) => {
                          setMediumNightDiscountPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-10 col-xxl-4 mx-auto">
                    <h3 className="text-center mt-3">Large Room Data</h3>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Large Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Large Price"
                        value={largePrice}
                        onChange={(e) => {
                          setLargePrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Large Discount Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Large Discount Price"
                        value={largeDiscountPrice}
                        onChange={(e) => {
                          setLargeDiscountPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Large Night Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Large Night Price"
                        value={largeNightPrice}
                        onChange={(e) => {
                          setLargeNightPrice(e.target.value);
                        }}
                      />
                    </div>
                    <h6 className="text-center mt-3" style={{color:"white"}}>Large Night Discount Price</h6>
                    <div className="container-input ps-2 mx-auto w-60 my-2">
                      <input
                        id="name"
                        type="text"
                        placeholder="Large Night Discount Price"
                        value={largeNightDiscountPrice}
                        onChange={(e) => {
                          setLargeNightDiscountPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
    
            <a
              className="text-light w-40 mt-5 mx-auto text-center pt-2 font-weight-bolder"
              style={{
                backgroundColor: "#fe9124",
                height: "40px",
                borderRadius: "8px",
                border: "none",
              }}
              //onClick={PostData}
            >
              Submit
            </a>
            <p></p><br/>
          </div>
        </div>
      );
};

export default SetPrices;