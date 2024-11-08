import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';




// Определяем интерфейс Props для HeaderComponent
interface HeaderComponentProps {
  onSearch: (locationName: string) => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ onSearch }) => {
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
      </Row>
    </header>
  );
};


