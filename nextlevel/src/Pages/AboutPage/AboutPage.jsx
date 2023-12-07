import React from 'react';
import './aboutpage.css';
import TopNavBar from '../LandingPage/NavBar/NavBar';
import Image1 from './football2.jpg';
import Image2 from './tennis.jpg';

const AboutPage = () => {


    return(
        <div className='about_container'>
            <TopNavBar />
            <h1 className='About'>About Us</h1>
            <div className='about_page'>
                <div className='image_container'>
                    <img src={Image1} alt='pictures supposed to be here'></img>
                </div>
                <div className='text_container'>
                    <p>Welcome to Next Level Intramurals, your ultimate destination for college intramural organization and participation! At Next Level Intramurals, we believe in fostering a vibrant and engaging community within college campuses through the exciting world of intramural sports. Whether you're a student eager to join teams, create your own, or an administrator looking for streamlined tools to effortlessly manage and organize games, Next Level Intramurals has you covered. Our platform provides a seamless experience for students to connect, compete, and enjoy a variety of sports while offering college administrators powerful tools to simplify the logistics of game creation and tracking. Elevate your intramural experience to the next level with us, where the spirit of friendly competition meets the convenience of modern organization. Join us in building a community that embraces the thrill of sports, teamwork, and healthy competition – Welcome to Next Level Intramurals!
                    </p>
                </div>
            </div>
                <div className='roles'>
                    <h2 className='team_member'>Keagan Bogart</h2>
                    <p>Team Leader: Coordinated Team Efforts, Back-end and Front-end Development </p>
                </div>

                <div className='roles'>
                    <h2 className='team_member'>Asher Coates</h2>
                    <p>Database Manager: Developed Database, Back-end Developer</p>
                </div>

                <div className='roles'>
                    <h2 className='team_member'>Jackson Garr</h2>
                    <p>Web Developer: Front-end Development </p>
                </div>

                <div className='roles'>
                    <h2 className='team_member'>Abner Chinea</h2>
                    <p> </p>
                </div>

                <div className='roles'>
                    <h2 className='team_member'>Arthur Lobo</h2>
                    <p> </p>
                </div>
                </div>
    );
};

export default AboutPage;