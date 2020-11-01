import React from 'react';
import { Col, Layout, Row } from 'antd';

const Footer: React.FC = () => {
  return (
    <Layout.Footer>
      <div className="container footer">
        <Row align="middle">
          <Col xs={24} sm={2}>
            Copyright
          </Col>
          <Col xs={24} sm={2}>
            About
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
