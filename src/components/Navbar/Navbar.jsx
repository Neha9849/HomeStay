import React from "react";
import logo from "./../../images/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = ({explore,url}) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg   static-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <div className="logoContainer">
              <img src={logo} alt="..." height="36" />
              <span className="px-2 ">HomeStay</span>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ms-auto">
            <Link to={url}>
            {/* <button className="btn btnProfile">Profile</button> */}
            </Link>
              {explore? null : 
                <Link to="/rooms">
                <button className="btn btnPrimary mx-2">
                  <b>Explore</b>
                </button>
              </Link>
              }
              <Link to="/host">
                <button className="btn btnSecondary">Host Rooms</button>
              </Link>
             
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
