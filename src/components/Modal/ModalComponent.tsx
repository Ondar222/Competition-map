import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'antd/es/modal/Modal';
import { Carousel } from 'antd';

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

interface ModalComponentProps {
    activeLocation: string | null;
    isModalVisible: boolean;
    handleModalClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ activeLocation, isModalVisible, handleModalClose }) => {
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

export default ModalComponent;