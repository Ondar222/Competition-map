import React from 'react';
import { useState } from 'react';
import Modal from 'antd/es/modal/Modal';

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

interface ModalComponentProps {
    activeLocation: string | null;
    isModalVisible: boolean;
    handleModalClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ activeLocation, isModalVisible, handleModalClose }) => {
    return (
        <Modal
            title={activeLocation ? locations[activeLocation].description : ''}
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
        >
            {activeLocation && (
                <img src={locations[activeLocation].imageUrl} alt={locations[activeLocation].description} style={{ width: '100%', height: 'auto' }} />
            )}
        </Modal>
    );
};

export default ModalComponent;