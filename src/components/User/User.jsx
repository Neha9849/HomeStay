import React from 'react'
import {useEffect,useState} from 'react'
import Navbar from './../Navbar/Navbar';
const User = ({account,bookings,url}) => {
  const [currentUserBookings,setCUB]= useState([])
  const cubArray=[];
    useEffect(() => {
        const getBookingsCurrent =()=>{
            console.log(bookings);
            bookings.map((booking)=>{
              if(booking.tenant==account){
                
                cubArray.push(booking);
              
              }

            })
             setCUB(cubArray)
        }
        getBookingsCurrent()
    },[])
    const bookingCards=()=>{
      let string=""
      if(currentUserBookings.length==0){
        return(
          <p>sorry nothing to show</p>
        )
      }
      else{
        currentUserBookings.map((booking)=>{
          const card=document.createElement('div');
          card.innerHtml="<h1>hi</h1>";
          const cards=document.getElementById("cards");
          cards.appendChild(card);
        })
       
      }
    }
  return (
    <>
     <Navbar url={url}/>
     <div className="container p-5">
      <h3>Your Bookings</h3>
      {/* {currentUserBookings && } */}
      <div className="dflex">
      {bookingCards()}
      <div className="cards" id="cards"></div>
      </div>

      </div>
    
  

    </>
  )
}

export default User