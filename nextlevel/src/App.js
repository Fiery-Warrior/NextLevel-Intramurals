// // import logo from './logo.svg';
// import './App.css';
// import NavBar from './NavBar/NavBar';
// import Footer from './NavBar/Footer';
// import PrivacyNotification from './NavBar/PrivacyNotification';
// import LandingPage from './Pages/LandingPage/Landingpage';
// import ActivityCenter from './ActivityCentral/ActivityCenter';


// function App() {
//   return (
//     <div className="App">
//       <NavBar/>
//       <PrivacyNotification/>
      
//       <header className="App-header">

//       <LandingPage/>
//       <section className='activity-center'/>
//       <ActivityCenter/>


//       </header>
//       <Footer/>

//     </div>
//   );
// }



import './App.css';
import NavBar from './Pages/LandingPage/NavBar/NavBar';
import Footer from './Pages/LandingPage/NavBar/Footer';
// import PrivacyNotification from './NavBar/PrivacyNotification';
// import ActivityCenter from './ActivityCentral/ActivityCenter';
import LandingPage from './Pages/LandingPage/Landingpage';
import Logininpage from './Pages/LogininPage/loginpage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

import {BrowserRouter as Router, Routes, Route }
from 'react-router-dom';


function App() {
  return (

    <div className="App">

    {/* <NavBar/> */}
   {/* <PrivacyNotification/> */}



      <Router>
            <Routes>
              <Route exact path='/' element={<LandingPage/>} />
              <Route path='/login' element={<Logininpage/>} />
              <Route path='/signin' element={<RegisterPage/>} />
            </Routes>
        </Router>





  </div>



    
    
  );
}

export default App;
