import React from "react";
import Navbar from "./../../Navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "./single.css";
import apartment from "./../../../images/types/apartment.jpg";
import house from "./../../../images/types/house.jpg";
import villa from "./../../../images/types/villa.jpg";
import penthouse from "./../../../images/types/penthouse.png";
import bungalow from "./../../../images/types/bungalow.jpg";
import ether from "./../../../images/ethereum.png";
const Single = () => {
  return (
    <>
      <div className="single">
        <Navbar />
        <div className="p-5 singleWrapper">
          <h2>Adaaran Club Rannalhi</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            maiores consectetur esse aliquam qui tempora inventore obcaecati
            perspiciatis aliquid asperiores temporibus magni sit natus
            molestiae, quo libero ipsa reprehenderit iste!
          </p>
          <div className="flexc imgWrapper my-5">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={1}
              slidesPerView={1}
              scrollbar={{ draggable: true }}
              loop="true"
              navigation>
              <SwiperSlide>
                <div class="img-container">
                  <img src={villa} alt="" srcset="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="img-container">
                  <img src={bungalow} alt="" srcset="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="img-container">
                  <img src={house} alt="" srcset="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="img-container">
                  <img src={penthouse} alt="" srcset="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="img-container">
                  <img src={apartment} alt="" srcset="" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="details my-4">
            <div className="left">
              <h3 className="py-2"> Room Details</h3>
             <p>Type : Apartment</p>
             <p>Guests : 4</p>
              <h3 className="py-2">Host Details</h3>
              <p>Name : Neha Deekonda</p>
              <p>
                Email :{" "}
                <a href="mailto:nehadeekonda9849@gmail.com">
                  nehadeekonda9849@gmail.com
                </a>
              </p>
              <p>Phone : +91 9182469635</p>
            </div>
            <div className="right card p-4">
              <div className="">
                <h4 className="d-inline">
                  2
                  <img src={ether} alt="" width="25px" />
                </h4>
                <small>Per Night</small>
                <div className="my-3">
                  <label htmlFor="check-out">Check-in</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkIn"
                    id="checkIn"
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="check-out">Check-out</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkOut"
                    id="checkOut"
                  />
                  <div className="my-3">
                  <b>Total :</b> 
                  <span> 16 ethereum</span>
                  <button className="btn btnPrimary w-100 my-3">Book</button>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="map mt-5">
            <h3 className="py-2"><span className="tprimary">Where</span> you'll be</h3>
            <iframe src="http://maps.google.com/maps?q=25.3076008,51.4803216&z=16&output=embed" height="450" className="w-100 my-2"  title="map"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
