import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from "axios";

import L from 'leaflet';
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css"
import './Map.css'

const MapComponent = () => {

    const [company, setCompany] = useState({});

    const {id} = useParams();

    const {aboutUs, certificate, mail, phoneNumber} = company;

    const loadCompany = useCallback(async () => {
        await axios.get(`http://localhost:8081/company/all`).then((response)=>{
            setCompany(response.data);
        });
    },[id]);

    useEffect(() => {
        loadCompany();
    }, [loadCompany])

    let navigate = useNavigate();



    const markers = [
        {
            geocode: [53.874676995918584, 27.561011865301207],
            popUp: "ТехноЭксСервис"
        }
    ];

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [28,28]
    })
  return (
    <div className="map-container">
      <div className="map-content">
        <MapContainer center={[53.874676995918584, 27.561011865301207]} zoom={15} style={{ height: "80%", width: "80%" }}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {markers.map(marker =>(
            <Marker position = {marker.geocode} icon={customIcon}>
                <Popup><h2>ТехноЭксСервис</h2></Popup>
            </Marker>
        ))

        }
          {/* <Marker position={[53.874676995918584, 27.561011865301207]}>
            <Popup>Минск, Беларусь</Popup>
          </Marker> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;


// import React from 'react';
// import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// const Map = () => {
//   return (
//     <div>
//       <ComposableMap>
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)
//           }
//         </Geographies>
//         <Marker coordinates={[27.561011865301207, 53.874676995918584]}>
//           <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
//         </Marker>
//       </ComposableMap>
//     </div>
//   );
// }
// export default Map;