import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};
const Maps = (props) => {
  return (
    <>
      <div>Map</div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233,
        }}
      />
    </>
  );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyADghnDH8cB2Comw6Jy3G3Smi9_epcg6ow'
  })(Maps);
