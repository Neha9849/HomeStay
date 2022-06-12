import React from "react";
import "./Rooms.css";
import ethereum from "./../../images/ethereum.png";
import {Link} from 'react-router-dom'
const Card = ({ img, roomName, prize, type, upVotes }) => {
  return (
    <>
   
    <div className="cardRoom">
        <div className="img">
          <img src={img} alt={roomName} className="cardImg " />
        </div>
        <div className="mt-2 p-3 pt-0">
          <h5>{roomName}</h5>
          <img src={ethereum} alt="ether" width="25px" />
            <span className="py-2">
            {prize} per night
          </span>
          <span className="upVotes">
          <i class="fa-solid fa-heart  p-1"></i>
          {upVotes}
          </span>
        
        </div>
      </div>
   
      
    </>
  );
};

export default Card;
