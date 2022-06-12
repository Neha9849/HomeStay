import React from "react";
import Navbar from "./../Navbar/Navbar";
import Searchbox from "./../Searchbox/Searchbox";
import { useState, useEffect } from "react";
import "./Rooms.css";
import Card from "./Card";
import { Link } from "react-router-dom";
import apartment from "./../../images/types/apartment.jpg";
import house from "./../../images/types/house.jpg";
import villa from "./../../images/types/villa.jpg";
import penthouse from "./../../images/types/penthouse.png";
import bungalow from "./../../images/types/bungalow.jpg";
// const rooms = await contract.methods.getAllRooms().call({ from: account })
const Rooms = ({ rooms,url }) => {
  const [searchValues, setSearchValues] = useState({});
  const [searchClick, setSearchClick] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  // let filteredRooms = [...rooms];
  const newArray = [];
  useState(()=>{
     setFilteredRooms(rooms);
  },[])
  useEffect(() => {
    if (searchClick) {
      rooms.map((room) => {
        if (
          room.location.state == searchValues.location.state &&
          room.location.country == searchValues.location.country
        ) {
           newArray.push(room)
        }
      });
      setFilteredRooms(newArray);
      console.log(filteredRooms);
      // setSearchClick(false);
    }
  }, [searchClick]);
  return (
    <>
      <div className="rooms">
        <Navbar explore={true} url={url} />
        <Searchbox
          setState={setSearchValues}
          searchValues={searchValues}
          setSearchClick={setSearchClick}
        />
        <div className="cards my-5">
          {}
          {filteredRooms.map((room) => {
            return (
              <Link to={"/room?id=" + room.roomId}>
                <Card
                  img={house}
                  roomName={room.roomName}
                  prize={window.web3.utils.fromWei(
                    String(room.rentPerDay),
                    "ether"
                  )}
                  upVotes={room.roomId}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rooms;
