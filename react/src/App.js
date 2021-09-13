import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import QRCodeScanner from "./components/QRCodeScanner";
import Home from "./components/Home";
import Profile from "./components/Profile";
import LogEntry from "./components/Logentry";
import LogHistory from "./components/LogHistory";
import 'react-html5-camera-photo/build/css/index.css';
import SocietyList from "./components/SocietyList";
import SocietyRegistration from "./components/SocietyRegistration";
const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/registersociety"} className="nav-link">
              Register Society
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/societylist"} className="nav-link">
            Society List
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.name}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/logexit/:value" component={LogEntry} />
          <Route path="/logentry/:value" component={LogEntry} />
          <Route path="/log/history" component={LogHistory} />
          <Route path="/registersociety" component={SocietyRegistration} />
          <Route path="/societylist" component={SocietyList} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
