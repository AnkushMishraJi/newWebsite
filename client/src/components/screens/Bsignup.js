import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Signup() {
  const history = useHistory();
  const [hotelName, setHotelName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [girlsWithBoys, setGirlsWithBoys] = useState(false);
  const [isNightPartyAllowed, setIsNightPartyAllowed] = useState(false);

  const [smallPrice, setSmallPrice] = useState("");
  const [smallPic, setSmallPic] = useState("");
  const [smallCapacity, setSmallCapacity] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [mediumPic, setMediumPic] = useState("");
  const [mediumCapacity, setMediumCapacity] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [largePic, setLargePic] = useState("");
  const [largeCapacity, setLargeCapacity] = useState("");
  const [smallNightPrice, setSmallNightPrice] = useState("");
  const [mediumNightPrice, setMediumNightPrice] = useState("");
  const [largeNightPrice, setLargeNightPrice] = useState("");

  let roomSmallData = {
    smallPrice,
    smallPic,
    smallCapacity,
    smallNightPrice,
  };
  let roomMediumData = {
    mediumPrice,
    mediumPic,
    mediumCapacity,
    mediumNightPrice,
  };
  let roomLargeData = {
    largePrice,
    largePic,
    largeCapacity,
    largeNightPrice,
  };

  //for checkboxes
  const [checkedRoomSmall, setCheckedRoomSmall] = useState(false);
  const [checkedRoomMedium, setCheckedRoomMedium] = useState(false);
  const [checkedRoomLarge, setCheckedRoomLarge] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({
        html: "Invalid Email",
        classes: "#d32f2f red darken-2",
      });
    }
    if (password != confirm) {
      return M.toast({
        html: "Passwords do not match",
        classes: "#d32f2f red darken-2",
      });
    }
    if (
      !hotelName ||
      !email ||
      !password ||
      !confirm ||
      !location ||
      !address
    ) {
      return M.toast({
        html: "Please enter all fields",
        classes: "#d32f2f red darken-2",
      });
    }

    fetch("/bsignup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        hotelName,
        location,
        address,
        girlsWithBoys,
        isNightPartyAllowed,
        roomSmallData,
        roomMediumData,
        roomLargeData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({
            html: "Saved Successfuly",
            classes: "#43a047 green darken-1",
          });
          history.push("/bsignin");
        }
      });
  };

  return (
    <div className="mycard card">
      <div className="auth-card input-field">
        <h2>Business Sign-up</h2>
        <input
          type="text"
          placeholder="Hotel Name"
          value={hotelName}
          onChange={(e) => {
            setHotelName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <div>
          <label>
            <input
              type="checkbox"
              value={girlsWithBoys}
              onClick={(e) => {
                setGirlsWithBoys(!girlsWithBoys);
              }}
            />
            <span>Are girls allowed with boys</span>
          </label>

          <label>
            <input
              type="checkbox"
              value={isNightPartyAllowed}
              onClick={(e) => {
                setIsNightPartyAllowed(!isNightPartyAllowed);
              }}
            />
            <span>Is Night Party Allowed ?</span>
          </label>

          <div>
            <label>
              <input
                type="checkbox"
                value={checkedRoomSmall}
                onClick={(e) => {
                  setCheckedRoomSmall(!checkedRoomSmall);
                }}
              />
              <span>Small Room</span>
              {checkedRoomSmall ? (
                <div>
                  <input
                    type="text"
                    placeholder="price for small room"
                    value={smallPrice}
                    onChange={(e) => {
                      setSmallPrice(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Night price for small room"
                    value={smallNightPrice}
                    onChange={(e) => {
                      setSmallNightPrice(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    placeholder="upload pictures for small room"
                    value={smallPic}
                    onChange={(e) => {
                      setSmallPic(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    placeholder="capacity of small room"
                    value={smallCapacity}
                    onChange={(e) => {
                      setSmallCapacity(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                value={checkedRoomMedium}
                onClick={(e) => {
                  setCheckedRoomMedium(!checkedRoomMedium);
                }}
              />
              <span>Medium Room</span>
              {checkedRoomMedium ? (
                <div>
                  <input
                    type="text"
                    placeholder="price for Medium Room"
                    value={mediumPrice}
                    onChange={(e) => {
                      setMediumPrice(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Night price for Medium Room"
                    value={mediumNightPrice}
                    onChange={(e) => {
                      setMediumNightPrice(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    placeholder="upload pictures for Medium Room"
                    value={mediumPic}
                    onChange={(e) => {
                      setMediumPic(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    placeholder="capacity of Medium Room"
                    value={mediumCapacity}
                    onChange={(e) => {
                      setMediumCapacity(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                value={checkedRoomLarge}
                onClick={(e) => {
                  setCheckedRoomLarge(!checkedRoomLarge);
                }}
              />
              <span>Large Room</span>
              {checkedRoomLarge ? (
                <div>
                  <input
                    type="text"
                    placeholder="price for Large room"
                    value={largePrice}
                    onChange={(e) => {
                      setLargePrice(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Night price for Large room"
                    value={largeNightPrice}
                    onChange={(e) => {
                      setLargeNightPrice(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="upload pictures for Large room"
                    value={largePic}
                    onChange={(e) => {
                      setLargePic(e.target.value);
                    }}
                  />

                  <input
                    type="text"
                    placeholder="capacity of Large room"
                    value={largeCapacity}
                    onChange={(e) => {
                      setLargeCapacity(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </label>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #1e88e5 blue darken-1"
          onClick={(e) => PostData()}
        >
          Sign Up
        </button>
        <h6>
          <Link to="/bsignin">Already have an account?</Link>
        </h6>
      </div>
    </div>
  );
}

export default Signup;
