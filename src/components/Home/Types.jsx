import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import apartment from "./../../images/types/apartment.jpg";
import house from "./../../images/types/house.jpg";
import villa from "./../../images/types/villa.jpg";
import penthouse from "./../../images/types/penthouse.png";
import bungalow from "./../../images/types/bungalow.jpg";
const Types = () => {
    const breakpoints={
            499: {
                slidesPerView: 1,
                spaceBetweenSlides: 50
            },
            999: {
                slidesPerView: 2,
                spaceBetweenSlides: 50
            }
    }
  return (
    <div className="types p-2 mt-5">
      <h1 className="text-center p-1 mt-5">
        Find a home of your <span className="tprimary">choice</span>{" "}
      </h1>
      <div className="container p-5">
        <Swiper
         slidesPerView={3}
         spaceBetween={1}
         breakpoints={{
            0:{
              width: 640,
              slidesPerView: 1,
            },
            640: {
              width: 640,
              slidesPerView: 1,
            },
           
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1200:{
                width: 1200,
                slidesPerView: 3,
            }
          }}
         
         
          loop="true"
          navigation
          modules={[Navigation, Pagination, Scrollbar, A11y]}>
          <SwiperSlide>
            <div className="card mx-5">
              <img className="card-img-top" src={villa} alt="villa" />
              <div className="card-body text-center">
                <p className="card-text">Villa</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card mx-5">
              <img className="card-img-top" src={apartment} alt="villa" />
              <div className="card-body text-center">
                <p className="card-text">Apartment</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card mx-5">
              <img className="card-img-top" src={bungalow} alt="villa" />
              <div className="card-body text-center">
                <p className="card-text">Bungalow</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card mx-5">
              <img className="card-img-top" src={house} alt="villa" />
              <div className="card-body text-center">
                <p className="card-text">House</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card mx-5">
              <img className="card-img-top" src={penthouse} alt="villa" />
              <div className="card-body text-center">
                <p className="card-text">Pent House</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Types;
