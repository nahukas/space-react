import React from 'react';
import Customers from '../components/Customers/Customers';

const WelcomePage: React.FC = () => {
  return (
    <section style={{ marginTop: '10vh' }}>
      <Customers />
    </section>
  );
};

export default WelcomePage;
