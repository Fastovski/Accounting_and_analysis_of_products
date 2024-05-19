import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
//import L from 'leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';

const MapComponent = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/company/all')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const markers = companies.map(company => ({
        geocode: [53.874676995918584, 27.561011865301207],
        popUp: "ТехноЭксСервис"
    }));

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [28, 28]
    });

    return (
        <div className="main-container">
            <div className="header">
                <h1>О Нас</h1>
            </div>
            <div>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="user">Меню</a>
                    </li>
                </ul>
            </div>

            {companies.map((company, index) => (
                <div key={index} className={`company-container company-container-${index}`}>
                    <div className="company-about">{company.aboutUs}</div>
                </div>
            ))}
            <div className="map-container">
                <div className="map-content">
                    <MapContainer center={[53.874676995918584, 27.561011865301207]} zoom={15} style={{ height: "80%", width: "80%" }}>
                        <TileLayer attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {markers.map(marker => (
                            <Marker position={marker.geocode} icon={customIcon}>
                                <Popup><h2>{marker.popUp}</h2></Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {companies.map((company, index) => (
                <div key={index} className={`company-container company-container-${index}`}>
                    <div className="company-phone">{company.phoneNumber}</div>
                    <div className="company-mail">{company.mail}</div>
                    <div className="company-certificate">Сертификаты: {company.certificate}</div>
                </div>
            ))}
        </div>
    );
    
};

export default MapComponent;
