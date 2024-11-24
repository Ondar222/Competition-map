import React, { useState, useEffect } from 'react';
import { Col, Input, Button, Modal, Carousel, Image } from 'antd';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const locations = {
  'taiga': {
    position: [51.924694, 94.146836],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl: 'img/photo1.jpg', 
    name: 'Тайга'
  },
  'saldam': {
    position: [51.606176, 94.177782],
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    imageUrl: 'img/photo2.jpg', 
    name: 'Салдам'
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
              <Image preview={false} src={selectedLocation.imageUrl} alt="Location" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div>
              <Image  preview={false} src={selectedLocation.imageUrl} alt="Location" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div>
              <Image  preview={false} src={selectedLocation.imageUrl} alt="Location" style={{ width: '100%', height: 'auto' }} />
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
  <Input
        placeholder="Поиск по названию места..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onPressEnter={handleSearch}
        style={{ position: 'absolute', top: 20, right: 50, zIndex: 1000, width: 300 }}
        prefix={<SearchOutlined />}
      />
      <MapContainer center={mapCenter} zoom={9} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.entries(locations).map(([key, { position, description, imageUrl }]) => (
          <Marker key={key} position={position} eventHandlers={{ click: () => handleMarkerClick(key) }}>
            <Popup>
              <Image src={imageUrl} alt={description} style={{ width: '150px', height: '100px' }} />
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
      <ModalComponent
        activeLocation={activeLocation}
        isModalVisible={isModalVisible}
        handleModalClose={handleModalClose}
      />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
