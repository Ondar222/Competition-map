import React, { useState, useEffect } from 'react';
import { Col, Input, Button, Modal, Carousel } from 'antd';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const locations = {
  'bridge': {
    position: [51.6683, 94.4650],
    description: 'Описание Моста',
    imageUrl: 'img/photo1.jpg',
    name: 'Мост'
  },
  'temple': {
    position: [51.6450, 94.4700],
    description: 'Описание Храма',
    imageUrl: 'img/photo2.jpg',
    name: 'Храм'
  },
};


const ModalComponent = ({ activeLocation, isModalVisible, handleModalClose }) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    if (activeLocation) {
      setSelectedLocation(locations[activeLocation]);
    } else {
      setSelectedLocation(null);
    }
  }, [activeLocation]);

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      onCancel={handleModalClose}
      centered
      width={500}
    >
      {selectedLocation && (
        <>
          <h3>{selectedLocation.name}</h3>
          <Carousel arrows infinite={false}>
            <div>
              <img src={selectedLocation.imageUrl} alt="Location" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div>
              <img src={selectedLocation.imageUrl} alt="Location" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div>
              <img src={selectedLocation.imageUrl} alt="Location" style={{ width: '100%', height: 'auto' }} />
            </div>
          </Carousel>
          <p>{selectedLocation.description}</p>
        </>
      )}
    </Modal>
  );
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState([51.6683, 94.4650]); 
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkerClick = (key: string) => {
    setActiveLocation(key);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setActiveLocation(null);
  };

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = () => {
    const foundLocation = Object.values(locations).find(
      location => location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.position.join(',').includes(searchQuery)
    );

    if (foundLocation) {
      setActiveLocation(Object.keys(locations).find(key => locations[key] === foundLocation)!);
      setIsModalVisible(true);
    } else {
      
      alert('Местоположение не найдено');
    }
  };

  return (
    <div>
      <Col span={6} style={{ float: 'right' }}>
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
          prefix={<SearchOutlined />} 
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
