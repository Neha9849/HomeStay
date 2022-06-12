import React from "react";
import Navbar from "./../../Navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "./single.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apartment from "./../../../images/types/apartment.jpg";
import house from "./../../../images/types/house.jpg";
import villa from "./../../../images/types/villa.jpg";
import penthouse from "./../../../images/types/penthouse.png";
import bungalow from "./../../../images/types/bungalow.jpg";
import ether from "./../../../images/ethereum.png";

const Single = ({ rooms, contract, account,url,bookings }) => {
  const [id, setId] = useSearchParams();
  const [type, setType] = useState();
  const [single, setSingle] = useState({});
  const [prize, setPrize] = useState();
  const [string, setString] = useState("");
  const [form, setForm] = useState({});
  const [total, setTotal] = useState(0);
  const [owner,setOwner]=useState({});
  
  useEffect(()=>{
    const getOwnerDetails= async ()=>{
     
    console.log(single);
    // const bookings= await contractObj.methods.getAllBookings().call({ from: account })
    const landlord= await contract.methods.landLordDetails(single.landlord).call();
      console.log(landlord)
      setOwner(landlord)
     
    }
    getOwnerDetails();
    
  },[single])
  useEffect(() => {
   
    
    const currentId = Number(id.get("id"));
    rooms.map((room) => {
      if (Number(room.roomId) == Number(currentId)) {
        const Urlstring = `http://maps.google.com/maps?q=${room.location.latitude},${room.location.longitude}&z=16&output=embed`;
        setString(Urlstring);
        const converted = window.web3.utils.fromWei(
          String(room.rentPerDay),
          "ether"
        );
        setPrize(converted);
        setSingle(room);
        switch (Number(room.roomType)) {
          case 0:
            setType("Bungalow");
            break;
          case 1:
            setType("Villa");
            break;
          case 2:
            setType("Apartment");
            break;
          case 3:
            setType("Penthouse");
            break;
          case 4:
            setType("House");
            break;
          default:
            setType("not mentioned");
        }
      }
    });
  });
  useEffect(() => {
    if (
      typeof form.checkIn != "undefined" &&
      typeof form.checkOut != "undefined"
    ) {
      let checkin = new Date(form.checkIn).getTime();
      let checkout = new Date(form.checkOut).getTime();
      console.log(`${checkin} nd ${checkout}`);
      let val = ((checkout - checkin) / 8.64e7) * prize;
      console.log(val);
      setTotal(val);
    }
  }, [form]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((values) => ({ ...values, [name]: value }));
  };
  const Book = async () => {
    let checkin = Math.floor(new Date(form.checkIn).getTime() / 1000);
    let checkout = Math.floor(new Date(form.checkOut).getTime() / 1000);
    const booked = await contract.methods
      .bookRoom(
        Number(id.get("id")),
        Number(checkin),
        Number(checkout),
        single.landlord
      )
      .send({
        from: account,
        value: window.web3.utils.toWei(String(total), "ether"),
      });
    console.log(booked);
  };

  return (
    <>
      <div className="single">
        <Navbar url={url} />
        <div className="p-5 singleWrapper">
          <h2>{single.roomName}</h2>
          <p>{single.description}</p>
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
              <p>Type :{type}</p>
              <p>Guests : {single.numberOfGuestsCanStay}</p>
              <h3 className="py-2">Host Details</h3>
              <p>Name :{owner.name}</p>
              <p>
                Email :{" "}
                <a href={`mailto:${owner.email}`}>
                  {owner.email}
                </a>
              </p>
              <p>Phone : {owner.contactNumber}</p>
            </div>
            <div className="right card p-4">
              <div className="">
                <h4 className="d-inline">
                  {prize}
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
                    onChange={handleChange}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="check-out">Check-out</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkOut"
                    id="checkOut"
                    onChange={handleChange}
                  />
                  <div className="my-3">
                    <b>Total :</b>
                    <span>{total}</span>
                    <button
                      className="btn btnPrimary w-100 my-3"
                      onClick={Book}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="map mt-5">
            <h3 className="py-2">
              <span className="tprimary">Where</span> you'll be
            </h3>
            <iframe
              src={string}
              height="450"
              className="w-100 my-2"
              title="map"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
