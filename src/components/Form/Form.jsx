import React from "react";
import Navbar from "./../Navbar/Navbar";
import { MultiStepForm, Step } from "react-multi-form";
import { useState,useEffect} from "react";
import "./Form.css";
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
const Form = () => {
  const [step, setStep] = useState(1);
  const [formDetails, setForm] = useState({});
  const [item, setItem] = useState('');
  useEffect(()=>{
    const autocomplete = new GeocoderAutocomplete(
      document.getElementById("autocomplete"), 
      '761f93c7a61048a489856d60598c4f95', 
      { /* Geocoder options */ });
  
  autocomplete.on('select', (location) => {
  // check selected location here 
  console.log(location);
  });
  
  autocomplete.on('suggestions', (suggestions) => {
  // process suggestions here
  });
  },[item]);
 
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((values) => ({ ...values, [name]: value }));
  };
 
  return (
    <div>
      <Navbar explore={false} />
      <div className="formContainer flexc">
        {/* form1 */}
        <div className="form">
          <MultiStepForm activeStep={step} accentColor={"var(--primary)"}>
            <Step label="personal details">
              <form className="py-2">
                <div className="m-5">
                  <label htmlFor="username">FullName</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    value={formDetails.username || ""}
                    onChange={handleChange}
                    placeholder="Enter your Full Name"
                    autoComplete="off"
                  />
                </div>
                <div className="m-5">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={formDetails.email || ""}
                    onChange={handleChange}
                    placeholder="Enter your Email Address"
                    autoComplete="on"
                  />
                </div>
                <div className="m-5">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={formDetails.phone || ""}
                    onChange={handleChange}
                    placeholder="ex: +91 XXXXXXXXXX"
                    autoComplete="on"
                  />
                </div>
              </form>
              <div className="p-2">
                <button
                  className="btn btnPrimary next"
                  onClick={() => {
                    setStep(2);
                  }}>
                  Next
                </button>
              </div>
            </Step>
            <Step label="room details">
              {/* form 2 */}
              <form className="py-2">
                <div className="m-5">
                  <label htmlFor="roomName">House Name</label>
                  <input
                    type="text"
                    name="roomName"
                    id="roomName"
                    className="form-control"
                    value={formDetails.roomName || ""}
                    onChange={handleChange}
                    placeholder="Give your home a name"
                    autoComplete="off"
                  />
                </div>
                <div className="m-5">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    value={formDetails.description || ""}
                    onChange={handleChange}
                    placeholder="Write a small description about your house"
                    autoComplete="off"
                  />
                </div>
                <div className="m-5">
                  <label htmlFor="numberOfGuestsCanStay">
                    Number of guests you can accommodate
                  </label>
                  <input
                    type="number"
                    name="numberOfGuestsCanStay"
                    id="numberOfGuestsCanStay"
                    className="form-control"
                    value={formDetails.numberOfGuestsCanStay || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="m-5">
                  <label htmlFor="type">Select a type</label>
                  <select class="form-control form-select" name="type"   onChange={handleChange}>
                    <option selected value="0">Bungalow</option>
                    <option value="1">Villa</option>
                    <option value="2">Apartment</option>
                    <option value="3">Penthouse</option>
                    <option value="4">House</option>
                  </select>
                </div>
              </form>
              <div className="p-2">
                <button
                  className="btn btnSecondary"
                  onClick={() => {
                    setStep(1);
                  }}>
                  Prev
                </button>
                <button
                  className="btn btnPrimary next"
                  onClick={() => {
                    setStep(3);
                  }}>
                  Next
                </button>
              </div>
            </Step>
            <Step label="final">
              {/* form 3 */}
              <form className="py-2">
                <div className="m-5">
                <label htmlFor="numberOfGuestsCanStay">
                   Address
                  </label>
                <div id="autocomplete" class="autocomplete-container"></div>
                 
                </div>
                <div className="m-5">
                  <label htmlFor="numberOfGuestsCanStay">
                    Number of guests you can accommodate
                  </label>
                  <input
                    type="number"
                    name="numberOfGuestsCanStay"
                    id="numberOfGuestsCanStay"
                    className="form-control"
                    value={formDetails.numberOfGuestsCanStay || ""}
                    onChange={handleChange}
                  />
                </div>
              </form>
              <div className="p-2">
                <button
                  className="btn btnSecondary"
                  onClick={() => {
                    setStep(2);
                  }}>
                  Prev
                </button>
                <button
                  className="btn btnPrimary next"
                  onClick={() => {
                    setStep(3);
                  }}>
                  Submit
                </button>
              </div>
            </Step>
          </MultiStepForm>
        </div>
      </div>
    </div>
  );
};

export default Form;
