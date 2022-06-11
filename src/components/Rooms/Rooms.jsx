import React from "react";
import Navbar from "./../Navbar/Navbar";
import Searchbox from "./../Searchbox/Searchbox";
import { useState } from "react";
import './Rooms.css';
import Card from './Card';
import apartment from "./../../images/types/apartment.jpg";
import house from "./../../images/types/house.jpg";
import villa from "./../../images/types/villa.jpg";
import penthouse from "./../../images/types/penthouse.png";
import bungalow from "./../../images/types/bungalow.jpg";

const Rooms = () => {
  const [searchValues,setSearchValues] =useState({nameM:"neha"})
  return (
    <>
    <div className="rooms">
    <Navbar explore={true} />
    <Searchbox setState={setSearchValues} searchValues={searchValues}/>
    
    <div className="cards my-5">
      <Card img={house} roomName="Marina" prize={2} upVotes={5} type="villa"/>
      <Card img={villa} roomName="Marina" prize={2} upVotes={5} type="villa"/>
      <Card img={apartment} roomName="Marina" prize={2} upVotes={5} type="villa"/>
      <Card img={penthouse} roomName="Marina" prize={2} upVotes={5} type="villa"/>
      <Card img={bungalow} roomName="Marina" prize={2} upVotes={5} type="villa"/><Card img={villa} roomName="Marina" prize={2} upVotes={5} type="villa"/>
     
    </div>
    </div>
    
    </>
  );
};

export default Rooms;
