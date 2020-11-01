import React from 'react';
import { Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import { URLs } from '../config/enums';

const Footer: React.FC = () => {
  return (
    <Layout.Footer>
      <div className="container footer">
        <Row align="middle">
          <Col xs={24} sm={4}>
            {/* <Link to={URLs.ABOUT} target="_blank">
              Copyright Nahukas
            </Link> */}
            <a href={URLs.LINKEDIN} target="_blank" rel="noreferrer">
              Copyright Nahukas
            </a>
          </Col>
          <Col xs={24} sm={2}>
            <Link to={URLs.ABOUT}>About us</Link>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
