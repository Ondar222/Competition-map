import React from 'react';
import { Row, Col, Space } from 'antd';
import { MailOutlined, PhoneOutlined, BankOutlined } from '@ant-design/icons';
import '../../index.css'


export default function FooterComponent() {
    return (
        <footer className="footer">
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col span={20}>
                    <h1 className="footer-title">Lana Soft</h1>
                </Col>
                <Col span={3}>
                    <Space size="large">
                        <a href="mailto:lanasoftcomp@mail.ru" target="_blank" rel="noopener noreferrer">
                            <MailOutlined className="footer-icon" />
                        </a>
                        <a href="tel:+79990180101" target="_blank" rel="noopener noreferrer">
                            <PhoneOutlined className="footer-icon" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <BankOutlined className="footer-icon" />
                        </a>
                    </Space>
                </Col>
            </Row>
        </footer>
    );
}