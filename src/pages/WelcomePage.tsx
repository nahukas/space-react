import React from 'react';
import Customers from '../components/Customers/Customers';

const WelcomePage: React.FC = () => {
  return (
    <>
      <div className="container">
        <section style={{ marginTop: '10vh' }}>
          <Customers />
        </section>
      </div>
    </>
  );
};

export default WelcomePage;
