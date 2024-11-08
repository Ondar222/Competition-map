import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Input, Col } from 'antd';
import { AimOutlined, SearchOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ModalComponent from '../Modal/ModalComponent';

const locations = {
  'bridge': { position: [51.6683, 94.4650], description: 'Место Моста', imageUrl: 'img/photo1.jpg', name: 'Кафе' },
  'temple': { position: [51.6450, 94.4700], description: 'Место Храма', imageUrl: 'img/photo2.jpg', name: 'Музей' },
};
const kyzylCenter: [number, number] = [51.747, 94.467];

const MapComponent: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState(kyzylCenter);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCurrentPosition(userCoordinates);
          setMapCenter(userCoordinates); // Обновляем центр карты на текущее местоположение
        },
        (error) => {
          console.error('Ошибка получения местоположения:', error);
          alert('Не удалось получить ваше местоположение.');
        }
      );
    } else {
      alert('Geolocation не поддерживается вашим браузером.');
    }
  };

  useEffect(() => {

    handleLocateUser();
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
        setMapCenter(foundLocation[1].position); // Обновляем центр карты
      } else {
        alert('Координаты не найдены');
      }
    } else {
      const locationKey = trimmedInput.toLowerCase() as keyof typeof locations;
      const location = locations[locationKey];
      if (location) {
        setCurrentPosition(location.position);
        setMapCenter(location.position); // Обновляем центр карты
      } else {
        alert('Место не найдено');
      }
    }
  };

  return (
    <div>
      <Col span={6} style={{float: 'right'}}
      >
       <Input
            placeholder="Поиск по названию места..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1000,
              width: 300,
            }}
            prefix={<SearchOutlined />} // Иконка поиска
          />
      </Col>
      <MapContainer center={mapCenter} zoom={11} style={{ height: '600px', width: '100%' }}>
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
        <Button
          type="primary"
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 1000,
          }}
          onClick={handleLocateUser}
        >
          <AimOutlined />
        </Button>
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