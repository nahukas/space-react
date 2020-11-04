import React from 'react';
import { Layout as AntLayout } from 'antd';
import Content from './Content';
import Footer from './Footer';

const PublicLayout: React.FC = ({ children }) => (
  <AntLayout>
    <Content>
      <div className="container">{children}</div>
    </Content>
    <Footer />
  </AntLayout>
);

export default PublicLayout;
