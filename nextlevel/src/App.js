import './App.css';
import LandingPage from './Pages/LandingPage/Landingpage';
import LoginPage from './Pages/LogininPage/loginpage';
import AdminLoginPage from './Pages/AdminLogininPage/Adminloginpage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

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
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <CookiesProvider>

    <div className="App">

      <Router>
            <Routes>
              <Route exact path='/' element={<LandingPage/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/adminlogin' element={<AdminLoginPage/>} />
              <Route path='/signin' element={<RegisterPage/>} />
            </Routes>
        </Router>
  </div>

  </CookiesProvider>
    
  );
}

export default App;





// <header className="App-header">

// <LandingPage/>
// <section className='activity-center'/>
// <ActivityCenter/>


// </header>
// <Footer/>
