import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//component imports
import Navigation from './components/Navigation';
import Boards from './components/Boards';
import Home from './components/Home';
import About from './components/About';
import Chat from './components/Chat';
import Error from './components/Error';
import Login from "./components/Login";
import Signup from "./components/Signup";

import { useEffect, useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Container } from "react-bootstrap";

//See .env
// const DEPLOY_MODE = (process.env.REACT_APP_DEPLOY_MODE === 'true') ? true : false;
// const API_URL = (DEPLOY_MODE === true) ?
//   process.env.REACT_APP_DEPLOY_API_URL :
//   process.env.REACT_APP_DEV_API_URL;
// const socket = io.connect(API_URL);



function App() {
  const [sessionData, setSessionData] = useState(
    sessionStorage.getItem('sessionData') ? JSON.parse(sessionStorage.getItem('sessionData')) : {}
  )
  const updateSessionToken = (token) => {
    setSessionData(token);
  }
  const clearSessionToken = () => {
    setSessionData({});
    sessionStorage.removeItem('sessionData');
  }

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'sessionData') {
        setSessionData(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
    // Dispatch storage event to notify other tabs/windows of the change
    window.dispatchEvent(new Event('storage'));
    // console.log(sessionData);
  }, [sessionData])

  // const updateData = () => {
  //   setSessionData({ ...sessionData, count: sessionData.count ? sessionData.count + 1 : 1 });
  // };

  let route;
  if (window.location.pathname === "/") {
    route = <Home />
  }
  else {
    switch (window.location.pathname) {
      case "/Home":
        route = <Home />;
        break;
      case "/Boards":
        route = <Boards />;
        break;
      case "/About":
        route = <About />;
        break;
      case "/Login":
        route = <Login 
                updateSessionFunc={updateSessionToken} 
                />;
        break;
      case "/Signup":
        route = <Signup />;
        break;
      case "/Collage_Of_Engineering":
        route = <Chat boardTitle={"Collage Of Engineering"}
                      boardRoute={"/Collage_Of_Engineering"}
                      updateSessionFunc={updateSessionToken}
                />;
        break;
        case "/CVPOOA":
          route = <Chat boardTitle={"College of Visual and Pooforming Arts"}
                        boardRoute={"/CVPOOA"}
                        updateSessionFunc={updateSessionToken}
                  />;
          break;
        case "/CLARTS":
          route = <Chat boardTitle={"College of Arts and Sciences"}
                        boardRoute={"/CLARTS"}
                        updateSessionFunc={updateSessionToken}
                  />;
          break;
        case "/CBUSS":
          route = <Chat boardTitle={"Charlton College of Business"}
                        boardRoute={"/CBUSS"}
                        updateSessionFunc={updateSessionToken}
                  />;
            break;
        case "/Test":
          route = <Chat boardTitle={"Test"}
                        boardRoute={"/Test"}
                        updateSessionFunc={updateSessionToken}
                  />;
          break;
      default:
        // Error route
        route = <Error />;
        break;
    }
  }
  return (
  <Container
  fluid
  className="App"
  style={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', overflow: 'auto', paddingRight: 0, paddingLeft: 0}}
  >
    <Container>
      <Navigation sessionData={sessionData}
              clearSessionFunc={clearSessionToken}
              />
      
    </Container>
    {route}
  </Container>
  );
}
export default App;