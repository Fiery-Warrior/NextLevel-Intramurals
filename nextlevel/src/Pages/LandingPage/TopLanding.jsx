import React from 'react';
import './landingImage.css';
import './NLCI.css';
// import { Button } from '@aws-amplify/ui-react';
import { Button } from '@material-ui/core';

import '@aws-amplify/ui-react/styles.css';
import PrivacyNotification from './NavBar/PrivacyNotification';
import Footer from './NavBar/Footer';
import ActivityCenter from './ActivityCentral/ActivityCenter.jsx';
import { Component } from "react";
import { useState } from 'react';
import Slider from "react-slick";

const images = [
  "./static/images/baseball.png",
  "./static/images/crosscountry.png",
  "./static/images/football.png",
  "./static/images/gamenight.png",
  "./static/images/golf.png",
  "./static/images/hockey.png",
  "./static/images/soccer.png",
  "./static/images/track.png",
];

const TopLanding = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-text">
        <h1>Next Level</h1>
        <h2>Community</h2>
        <h2>Intramurals</h2>

        <p>Since 2023</p>

        <Button
          variation="primary"
          href="/signin"
          style={{ backgroundColor: "rgb(4, 125, 149)", color: "white" }}
        >
          Join Now
        </Button>
      </div>

      <div className="landing-page-image">
        {/* Static image */}
        <img src={images[currentImageIndex]} alt={images[currentImageIndex].split('/').pop().split('.')[0]} />

        <div className="image-controls">
          <button onClick={handlePreviousClick} disabled={currentImageIndex === 0}>
            Previous
          </button>

          <button onClick={handleNextClick} disabled={currentImageIndex === images.length - 1}>
            Next
          </button>
        </div>
      </div>

      <div
        style={{
          borderTop: "2px solid #fff",
          marginLeft: 20,
          marginRight: 20,
        }}
      ></div>
    </div>
  );
};

export default TopLanding;


    /*
    const images = [
      '/static/images/baseball.png',
      '/static/images/crosscountry.png',
      '/static/images/football.png',
      '/static/images/gamenight.png',
      '/static/images/golf.png',
      '/static/images/hockey.png',
      '/static/images/soccer.png',
      '/static/images/track.png',
    ];

    const SimpleSlider = () => {
      const [currentImageIndex, setCurrentImageIndex] = useState(0);

      const handlePreviousClick = () => {
        setCurrentImageIndex(currentImageIndex - 1);
      };

      const handleNextClick = () => {
        setCurrentImageIndex(currentImageIndex + 1);
      };

      return (
        <div>
          {currentImageIndex === 0 ? (
            // Render the first image statically.
            <img src={images[0]} />
          ) : (
            // Render the current image normally.
            <img src={images[currentImageIndex]} />
          )}
          <button onClick={handlePreviousClick}>Previous</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      );
    };

    export default SimpleSlider;
    */
