import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { URLs } from '../config/enums';

const NotFoundPage: React.FC = () => {
  const history = useHistory();
  return (
    <main className="not-found">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ marginBottom: '30px' }}>Are you lost?</h1>
        <Button type="primary" onClick={() => history.push(URLs.ROOT)}>
          Go Home
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
