import React from 'react';
import { Layout } from 'antd';
import MapComponent from './components/Map/MapComponent';
import { HeaderComponent } from './components/Header/HeaderComponent';
import FooterComponent from './components/Footer/FooterComponent';
import './index.css'

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
  <Layout>
    <Header>
      <HeaderComponent />
    </Header>
    <Content style={{ padding: '50px' }}>
      <MapComponent />
    </Content>
    <Footer className="custom-footer">
      <FooterComponent />
    </Footer>
  </Layout>
);

export default App;