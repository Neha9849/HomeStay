import React from "react";
import Navbar from "./../Navbar/Navbar";
import Searchbox from "./../Searchbox/Searchbox";
import { useState } from "react";
import './Rooms.css'
const Rooms = () => {
  const [searchValues,setSearchValues] =useState({nameM:"neha"})
  return (
    <>
    <div className="rooms">
    <Navbar explore={true} />
    <Searchbox setState={setSearchValues} searchValues={searchValues}/>
    
    <div className="cards">
      <div className="cardRoom">
        1
      </div>
      <div className="cardRoom">
        1
      </div>
      <div className="cardRoom">
        1
      </div>
      <div className="cardRoom">
        1
      </div>
      <div className="cardRoom">
        1
      </div>
      <div className="cardRoom">
        1
      </div>
    </div>
    </div>
    
    </>
  );
};

export default Rooms;
