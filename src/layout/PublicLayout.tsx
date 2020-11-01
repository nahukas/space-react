import React from 'react';
import { Layout as AntLayout } from 'antd';
import Content from './Content';

const PublicLayout: React.FC = ({ children }) => (
  <AntLayout>
    <Content>{children}</Content>
  </AntLayout>
);

export default PublicLayout;
