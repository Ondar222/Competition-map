import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Определяем интерфейс Props для HeaderComponent
interface HeaderComponentProps {
  onSearch: (locationName: string) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery); // Используем переданный метод onSearch
  };

  return (
    <header>
      <Row>
        <Col span={16}>
          <h1>Конкурс Отелей</h1>
        </Col>

        <Col span={8}>
         
        </Col>
      </Row>
    </header>
  );
};

export default HeaderComponent;