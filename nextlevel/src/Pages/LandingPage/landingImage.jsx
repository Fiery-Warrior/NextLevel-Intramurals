import React from 'react';
import './landingeImage.css';

function LandingImage() {
  return (
    <div className="landing-image">
        
        <img src={process.env.PUBLIC_URL + '/trophy.png'} alt="Trophy" />



    </div>

  );
}
export default LandingImage;

