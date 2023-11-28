import React, { useState } from 'react';
import './ContactPage.css';
import SideImage from './Intermural1.jpeg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., send data to a server
    console.log('Form submitted:', formData);
    // Reset the form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (

      <div className="flex_container">
        <img className='side_image' src={SideImage} alt="Image 1" />
      <form className='contact_form' onSubmit={handleSubmit}>
      <h2 className='contact_style'>Contact Us</h2>
      <label>
        Name: 
        <input className='name_input' type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br/>
      <label>
        Email:
        <input className='email_input' type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br/>
      <label>
        Message:
        <textarea className='message_input' name="message" value={formData.message} onChange={handleChange} />
      </label>
      <br />
      <button className='button_input' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ContactPage;





/*import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div>
      <link
  rel="stylesheet"
  type="text/css"
  charset="UTF-8"
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
/>
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
/>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

<body>
        <div class="search-wrapper">
          <label for="search">Search Users</label>
          <input type="search" id="search" />
        </div>
        <div className="user-cards"></div>
        <template data-user-template>
        <div class="card">
            <div class="header" data-header></div>
            <div class="body" data-body></div>
          </div>
        </template>
      </body>

import './TeamSelection.css';

const TeamListPage = () => {
  const [teams, setTeams] = useState([
    'Team 1 Team 1 Team 1 Team 1 Team 1 Team 1',
    'Team 2',
    'Team 3',
    'Team 4',
    'Team 5',
  ]);

  return (
    <div>
      <h1>Team List</h1>
      <ul>
        {teams.map((team, index) => (
          <li key={index} className='list_item'>
            {team}
            <span></span>
            <button class="add_button">+</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamListPage;

*/
