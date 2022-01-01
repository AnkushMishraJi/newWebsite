import React from "react";
import { useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import M from "materialize-css";

const CarouselContainer = (props) => {
  return (
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
};

export default CarouselContainer;
