import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ModalComponent from '../Modal/ModalComponent';

const locations = {
    'cafe': {
        position: [51.6683, 94.4650],
        description: 'Место Моста',
        imageUrl: 'img/photo1.jpg', 
    },
    'museum': {
        position: [51.6450, 94.4700], 
        description: 'Место Храма',
        imageUrl: 'img/photo2.jpg', 
    },
};

const MapComponent: React.FC = () => {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleMarkerClick = (key: string) => {
        setActiveLocation(key);
        setIsModalVisible(true); // Открываем модал при клике на маркер
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setActiveLocation(null); // Закрываем модал и сбрасываем активное место
    };

    return (
        <div>
            <MapContainer center={[51.747, 94.467]} zoom={11} style={{ height: '600px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {Object.entries(locations).map(([key, { position, description, imageUrl }]) => (
                    <Marker key={key} position={position} eventHandlers={{ click: () => handleMarkerClick(key) }}>
                        <Popup>
                            <img src={imageUrl} alt={description} style={{ width: '150px', height: 'auto' }} />
                            <p>{description}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <ModalComponent 
                activeLocation={activeLocation} 
                isModalVisible={isModalVisible} 
                handleModalClose={handleModalClose} 
            />
        </div>
    );
};

export default MapComponent;