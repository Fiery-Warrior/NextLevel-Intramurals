import React, { useState, useEffect } from 'react';
import './NLCI.css';
import './imageslider.css'
// import { Button } from '@aws-amplify/ui-react';
import { Button } from '@material-ui/core';
import '@aws-amplify/ui-react/styles.css';
import Image1 from './imgs/volleyball1.jpg';
import Image2 from './imgs/basketball1.jpg';
import Image3 from './imgs/football1.jpg';
import PrivacyNotification from './NavBar/PrivacyNotification';
import Footer from './NavBar/Footer';
import ActivityCenter from './ActivityCentral/ActivityCenter.jsx';
import CarouselFadeExample from './Imagecarousel.jsx';

const IMAGES = [Image1, Image2, Image3];



function TopLanding() {

  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const plusSlides = (n) => {
    const newIndex = slideIndex + n;
    setSlideIndex(newIndex);
    showSlides(newIndex);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(slides.length);
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };

  return (
    <div className="landing-page">
      <div className="landing-page-text">
        <h1>Next Level</h1>
        <h2>Community</h2>
        <h2>Intramurals</h2>

        <p> Since 2023 </p>

        <Button variation="primary"  href='/register' style ={{fontSize: '20px', backgroundColor: 'rgb(4, 125, 149)', color: 'white'}}>Join Now</Button >


      </div>

      <div className='slideshow-container'>
      <div className="mySlides fade">
        <div className='numbertext'>1 / 3</div>
        <img className='img' src={Image1} alt="" />
        <div className='text'>Volleyball</div>
      </div>

      <div className="mySlides fade">
        <div className='numbertext'>2 / 3</div>
        <img className='img' src={Image2} alt="" />
        <div className='text'>Basketball</div>
      </div>

      <div className="mySlides fade">
        <div className='numbertext'>3 / 3</div>
        <img className='img' src={Image3} alt="" />
        <div className='text'>Football</div>
      </div>

      <button className='prev' onClick={() => plusSlides(-1)}>
          &#10094;
        </button>
        <button className='next' onClick={() => plusSlides(1)}>
          &#10095;
        </button>

        <div style={{ textAlign: 'center' }}>
        
          <span class='dot' onClick={() => currentSlide(1)}></span>
          <span class='dot' onClick={() => currentSlide(2)}></span>
          <span class='dot' onClick={() => currentSlide(3)}></span>  
  
      </div>

      <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

    </div>
    </div>
  );
}

export default TopLanding;