import React, { useState } from "react";
import M from "materialize-css";

function UploadPhoto() {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const PostData = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "meraadda-web");
    data.append("cloud_name", "mera-adda");
    fetch("https://api.cloudinary.com/v1_1/mera-adda/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicUrl(data.url);
        // console.log(data.url);
        // console.log(JSON.stringify(data));
        // console.log("photo is uploaded");
        // console.log(picUrl);
      })
      .then(
        fetch("/photoUpload", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            picUrl,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
            } else {
              window.location.reload();
              M.toast({
                html: "Saved Successfuly",
                classes: "#43a047 green darken-1",
              });
            }
          })
      )
      .catch((err) => {
        // console.log(err);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <div className="mycard card">
        <div className="auth-card input-field">
          <h2>Upload Photo</h2>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="title"
          />
          <div class="file-field input-field">
            <div class="btn">
              <span>Browse</span>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light #1e88e5 blue darken-1"
            onClick={(e) => PostData()}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadPhoto;
