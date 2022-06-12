import React from "react";
import Navbar from "./../Navbar/Navbar";
import "./Home.css";
import landing from "./../../images/main.png";
import Types from "./Types";
import money from "./../../images/money.png";
import search from "./../../images/search.png";
import home from "./../../images/home.png";
import { Link } from "react-router-dom";
const Home = ({url}) => {
  return (
    <>
      <Navbar explore={false}  url={url} />
      <div className="home">
        <div className="left flexc w-100">
          <div>
            <h1>Experience a home</h1>
            <h1 className="main">
              with <span className="tprimary"> HomeStay</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br></br>
              Quidem distinctio aut iure aspernatur! Sequi consequatur br <br />
              tenetur minima saepe qui illo aliquid. Reiciendis accusamus{" "}
              <br></br> .
            </p>
            <div className=" mt-4">
              <Link to="/rooms">
                <button className="btn btnPrimary">
                  <b>Explore</b>
                </button>
              </Link>
              <Link to="/host">
                <button className="btn btnSecondary mx-3">Host Rooms</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="right flexc w-100">
          <img src={landing} alt="" className="img-fluid w-75" />
        </div>
      </div>
      <div className="features mt-5">
        <div className="container p-5">
          <h1 className=" text-center pt-3 pb-1">
            Find a best <span className="tprimary">stay</span>
          </h1>
          <div className="py-3 px-5">
            <p className="tsecondary text-center">
              We ensure that you'll embark on a perfectly planned, <br></br>safe
              stay at a price you can afford.{" "}
            </p>
          </div>
          <div className="row pt-5">
            <div class="col-lg-4 col-md-12 col-sm-12 flexc">
              <div className="feature flexc">
                <div>
                  <div className="w-100 flexc p-2">
                    <img src={money} alt="" srcSet="" width="80" />
                  </div>
                  <h4 className="text-center">Worth of money</h4>
                  <p className="text-center">
                    Offering a quality and affordability, HomeStays a great
                    value of accomodation for long term stays
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 flexc">
              <div className="feature flexc">
                <div>
                  <div className="w-100 flexc p-2">
                    <img src={home} alt="" srcSet="" width="80" />
                  </div>
                  <h4 className="text-center">Real Homes</h4>
                  <p className="text-center">
                    Every home has a host person and they'll help you settle
                    into life in a new place
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 flexc">
              <div className="feature flexc">
                <div>
                  <div className="w-100 flexc p-2">
                    <img src={search} alt="" srcSet="" width="80" />
                  </div>
                  <h4 className="text-center">Discover more</h4>
                  <p className="text-center">
                    We have a best collection rentals worldwide. Discover offers
                    and compare
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Types />
    </>
  );
};

export default Home;
