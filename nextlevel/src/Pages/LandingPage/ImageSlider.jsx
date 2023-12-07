import React, {LandingPage} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const images = [
        '/imgs/tennis.jpg',
        '/imgs/testimage2.JPG',
        '/imgs/testimage3.JPG',
        '',
    ];

    return (
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`slide-${index+1}`} />
            </div>
          ))}
        </Slider>
      );
    };
    
    export default ImageSlider;