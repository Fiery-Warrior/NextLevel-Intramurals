import React from 'react';
import Slider from 'react-slick';
import './landingImage.css';
import './NLCI.css';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import PrivacyNotification from './NavBar/PrivacyNotification';
import Footer from './NavBar/Footer';
import ActivityCenter from './ActivityCentral/ActivityCenter.jsx';
import TopLanding from './TopLanding.jsx';
import TopNavBar from './NavBar/NavBar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Assuming images are in the 'imgs' folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg)$/));

function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="start-page">
      <TopNavBar />
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.default} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>

      <TopLanding/>
      <PrivacyNotification />

      <div className="activity-center">
        <ActivityCenter />
      </div>

      <Footer />
    </div>
  );
}


export default LandingPage;