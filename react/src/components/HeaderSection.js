import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
//   import Home from './Home';
//   import AboutUs from './AboutUs';
//   import ContactUs from './ContactUs';

class HeaderSection extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="primary" variant="dark" expand="lg" sticky="top" color="0032a0">
                                <Navbar.Brand href="#home">Simplify Entry</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            </Navbar>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default HeaderSection;