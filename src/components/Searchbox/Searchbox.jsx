import React from "react";
import "./search.css";
import { useEffect } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";

const Searchbox = ({ searchValues, setState }) => {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById("searchLocation"),
      "761f93c7a61048a489856d60598c4f95",
      {
        /* Geocoder options */
      }
    );

    autocomplete.on("select", (location) => {
      // check selected location here
      console.log(location);
    });

    autocomplete.on("suggestions", (suggestions) => {
      // process suggestions here
    });
  }, []);

  return (
    <div className="w-100">
      <div className="banner ">
        <div className="h-100  bannerHeading">
          
          <h1 className=" p-5">
            <span className="tprimary">
            Find &nbsp;
            </span>
             your place <br />
           for together</h1>
          
       
        </div>
     
      </div>
      
       {/* <h1>Find your home for together</h1> */}
      <div className="searchContainer">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <label htmlFor="searchLocatoin">Location</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend flexc">
                <span class="input-group-text h-100 flexc" id="basic-addon1">
                  <i class="fa-solid fa-location-dot"></i>
                </span>
              </div>

              <div
                id="searchLocation"
                className="autocomplete-container form-control"></div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 ">
            <label htmlFor="check-in">Check-in</label>
            <input
              type="date"
              className="form-control"
              name="checkIn"
              id="checkIn"
              value={searchValues.checkIn || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12">
            <label htmlFor="check-out">Check-in</label>
            <input
              type="date"
              className="form-control"
              name="checkOut"
              id="checkOut"
              value={searchValues.checkOut || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12 flexc">
            <button className="btn btnPrimary">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbox;
