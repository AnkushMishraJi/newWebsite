import React, {useState,useEffect} from 'react';
import Swal from 'sweetalert2';

const Addtag= ()=>{
    const [tagName, setTagName] = useState("");

    return (
        <>
        <div>
            <h2 className="text-center mt-3 py-5" style={{color: "#fe9124"}}>Add Tag</h2>
            <div className="container-input ps-2 mx-auto w-60 my-2">
                <input
                    id="name"
                    type="text"
                    placeholder="Tag"
                    value={tagName}
                    onChange={(e) => {
                        setTagName(e.target.value);
                    }}
                />
            </div>
            <botton
                className="btn waves-effect bg-orange font-weight-bolder mt-5 px-5"
            >
                Submit
            </botton>
        </div>
        </>
    )
}

export default Addtag;