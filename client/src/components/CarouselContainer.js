import React from "react";
import { useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import M from "materialize-css";

const CarouselContainer = (props) => {
 if(props.selectedRoom == "small" && props.hotel.roomSmallData && props.hotel.roomSmallData.smallPic[0]!=""){
  return (
    props.device == 'desktop' ?
    <Carousel centerMode={true} autoPlay={true} centerSlidePercentage={50} dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src={props.hotel.roomSmallData.smallPic[0]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomSmallData.smallPic[1]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomSmallData.smallPic[2]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
    </Carousel>
    :
    <Carousel dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src={props.hotel.roomSmallData.smallPic[0]}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomSmallData.smallPic[1]}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomSmallData.smallPic[2]}
        />
      </div>
    </Carousel>
  );
 }
 else if(props.selectedRoom == "medium" && props.hotel.roomMediumData && props.hotel.roomMediumData.mediumPic[0]!=""){
  return (
    props.device=='desktop' ?
    <Carousel centerMode={true} autoPlay={true} centerSlidePercentage={50} dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src={props.hotel.roomMediumData.mediumPic[0]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomMediumData.mediumPic[1]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomMediumData.mediumPic[2]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
    </Carousel>
    :
    <Carousel dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src={props.hotel.roomMediumData.mediumPic[0]} 
        />
      </div>
      <div>
      <img
          src={props.hotel.roomMediumData.mediumPic[1]}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomMediumData.mediumPic[2]}
        />
      </div>
    </Carousel>
  );
 }
 else if(props.selectedRoom == "large" && props.hotel.roomLargeData && props.hotel.roomLargeData.largePic[0]!=""){
  return (
    props.device=='desktop' ?
    <Carousel centerMode={true} autoPlay={true} centerSlidePercentage={50} dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src={props.hotel.roomLargeData.largePic[0]} style={{width:"90%", maxHeight:"350px",}}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomLargeData.largePic[1]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomLargeData.largePic[2]} style={{width:"90%", maxHeight:"350px"}}
        />
      </div>
    </Carousel>
    :
    <Carousel dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
        <img
          src={props.hotel.roomLargeData.largePic[0]}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomLargeData.largePic[1]}
        />
      </div>
      <div>
      <img
          src={props.hotel.roomLargeData.largePic[2]}
        />
      </div>
    </Carousel>
  );
 }
 else if(props.selectedRoom){
   return(
    <Carousel dynamicHeight={false} showThumbs={false} infiniteLoop={true}>
      <div>
      <img
        src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/${props.selectedRoom}/hotel1.jpg`}
      />
    </div>
    <div>
      <img
        src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/${props.selectedRoom}/hotel2.jpg`}
      />
    </div>
    <div>
      <img
        src={`http://res.cloudinary.com/mera-adda/image/upload/v1640882770/hotels/charans/${props.selectedRoom}/hotel3.jpg`}
      />
    </div> 
  </Carousel>
   );
 }
  
};

export default CarouselContainer;
