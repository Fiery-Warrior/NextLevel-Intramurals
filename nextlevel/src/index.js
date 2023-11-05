//Try 1
// import React, { useState, useEffect } from 'react';
// import { CookiesProvider, useCookies } from 'react-cookie';
// import ReactDOM from 'react-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// function setLoggedInCookie(cookies) {
//   cookies.set('loggedIn', true, { maxAge: 3600 }); // set cookie to expire in 1 hour
// }

// function setLoggedOutCookie(cookies) {
//   cookies.remove('loggedIn');
// }

// function AppWrapper() {
//   const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     if (cookies.loggedIn) {
//       setIsLoggedIn(true);
//     }
//   }, [cookies.loggedIn]);

//   function handleLogin() {
//     setIsLoggedIn(true);
//     setLoggedInCookie(cookies);
//   }

//   function handleLogout() {
//     setIsLoggedIn(false);
//     setLoggedOutCookie(cookies);
//   }

//   return (
//     <CookiesProvider>
//       <React.StrictMode>
//         <App isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
//       </React.StrictMode>
//     </CookiesProvider>
//   );
// }

// root.render(<AppWrapper />);

// reportWebVitals();




//Original
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
   <CookiesProvider>
      <App />
   </CookiesProvider>,
   document.getElementById('root')
);

reportWebVitals();
