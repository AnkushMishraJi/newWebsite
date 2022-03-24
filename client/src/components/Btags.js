import React, {useState,useEffect} from 'react';
import Swal from 'sweetalert2';

const Addtag= ()=>{
    const [tag_name, setTagName] = useState("");
    const [tag_description, setDiscription] = useState("");
    const _id = localStorage.getItem("b_id");
    console.log(_id);
    
    const PostData = () => {
        if (tag_name.length>30) {
        return Swal.fire({
            icon: "error",
            title: "Invalid",
            text: "Tag is too long",
            confirmButtonColor: "#FF3030",
            allowEnterKey: false,
        });
        }
        if (
        !tag_name ||
        !tag_description
        ) {
        return Swal.fire({
            icon: "error",
            title: "Missing",
            text: "Please enter all fields",
            confirmButtonColor: "#FF3030",
            allowEnterKey: false,
        });
        }
        
        fetch("/api/userHotel/addTags", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tag_name,
            tag_description,
            _id
        }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: data.error,
                confirmButtonColor: "#FF3030",
                allowEnterKey: false,
            });
            } else {
            Swal.fire({
                icon: "success",
                title: "Saved",
                text: "Tag Added Successfully",
                confirmButtonColor: "#FF3030",
                allowEnterKey: false,
            });
            }
        });
        setTagName("");
        setDiscription("");
    };

    return (
        <>
        <div className="container">
            <div className="row">
                <h2 className="text-center mt-3 py-5" style={{color: "#FF3030"}}>Add Tag</h2>

                <div className="col-md-8 col-10 col-xxl-8 mx-auto">
                    <div className="mx-auto w-50 mt-3">
                        <input
                            id="name"
                            type="text"
                            placeholder="Tag"
                            value={tag_name}
                            style={{background: "white", borderRadius: "6px"}}
                            onChange={(e) => {
                                setTagName(e.target.value);
                            }}
                        />
                    </div>
                </div>
                
                <div className="col-md-4 col-10 col-xxl-4 mx-auto">
                    <botton className="btn waves-effect bg-orange font-weight-bolder px-2"
                    onClick={(e) => PostData()}
                    style={{width: "140px",height: "45px"}}>
                        Submit
                    </botton>
                </div>
                
                <div className="col-md-12 col-10 col-xxl-12 w-70 mx-auto mt-2">
                    <textarea
                    id="myBox"
                    placeholder="ENTER DISCRIPTION"
                    value={tag_description}
                    style={{background: "white", borderRadius: "6px", height: "200px"}}
                    onChange={(e)=>{
                        setDiscription(e.target.value);
                    }}></textarea>
                </div>
            </div>
        </div>
        </>
    )
}

export default Addtag;