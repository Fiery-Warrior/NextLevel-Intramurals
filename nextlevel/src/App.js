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
import TeamSelectionPage from './Pages/TeamSelectionPage/TeamSelection';

import {BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
/*const userCardTemplate = document.querySelector("[data-user-template]");
fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {})
  data.forEach(user => {
  const card = userCardTemplate.textContent.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]")
  const body = card.querySelector("[data-body]") 
  console.log(card);
  })*/

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
              <Route path='/teamselection' element={<TeamSelectionPage/>} />
            </Routes>
        </Router>





  </div>



    
    
  );
}

export default App;





// <header className="App-header">

// <LandingPage/>
// <section className='activity-center'/>
// <ActivityCenter/>


// </header>
// <Footer/>
