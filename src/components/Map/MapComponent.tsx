import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ModalComponent from '../Modal/ModalComponent';
import { HeaderComponent } from '../Header/HeaderComponent';

const locations = {
    'cafe': {
      position: [51.6683, 94.4650],
      description: 'Место Моста',
      imageUrl: 'img/photo1.jpg',
      name: 'Кафе', 
    },
    'museum': {
      position: [51.6450, 94.4700], 
      description: 'Место Храма',
      imageUrl: 'img/photo2.jpg',
      name: 'Музей',
    },
  };
  
  const MapComponent: React.FC = () => {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition([latitude, longitude]);
          },
          (error) => {
            console.error('Ошибка получения местоположения:', error);
          }
        );
      } else {
        alert('Геолокация не поддерживается вашим браузером.');
      }
    }, []);
  
    const handleMarkerClick = (key: string) => {
      setActiveLocation(key);
      setIsModalVisible(true);
    };
  
    const handleModalClose = () => {
      setIsModalVisible(false);
      setActiveLocation(null);
    };
  
    const handleSearch = (locationName: string) => {
      const trimmedInput = locationName.trim();
      const isCoordinateSearch = trimmedInput.split(',').length === 2;
  
      if (isCoordinateSearch) {
        const coords = trimmedInput.split(',').map(coord => parseFloat(coord.trim()));
        const foundLocation = Object.entries(locations).find(([key, { position }]) =>
          position[0] === coords[0] && position[1] === coords[1]
        );
  
        if (foundLocation) {
          setCurrentPosition(foundLocation[1].position);
        } else {
          alert('Координаты не найдены');
        }
      } else {
        const locationKey = trimmedInput.toLowerCase() as keyof typeof locations;
        const location = locations[locationKey];
        if (location) {
          setCurrentPosition(location.position);
        } else {
          alert('Место не найдено');
        }
      }
    };
  
    const selectedLocation = activeLocation ? locations[activeLocation] : null;
  
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
  
          {currentPosition && (
            <Marker position={currentPosition} icon={L.icon({
              iconUrl: 'https://iconarchive.com/download/i108630/Location-House/Map-Marker-2-3.ico',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}>
              <Popup>
                <p>Ваше текущее местоположение</p>
              </Popup>
            </Marker>
          )}
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