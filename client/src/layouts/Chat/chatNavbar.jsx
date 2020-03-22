import React from 'react';
import { Button, Typography } from 'antd';

const navbar = () => {
  const { Text } = Typography;
  return (
    <div className="" style={styles.navbar}>
      <nav className="navbar">
        <img
          src="./threndLogo.jpg"
          style={{ width: '100px' }}
          alt="thrend logo"
        />
        <p className="text-danger">
          {' '}
          Refreshing this page will AUTO log you out of chatroom{' '}
        </p>
        <ul className="py-1" onClick={() => window.location.reload()}>
          <li onClick={() => console.log('hey')} style={{ cursor: 'pointer' }}>
            <img
              src="./logout.png"
              style={{ width: '25px' }}
              alt="thrend chat logout"
            />
            <span className="text-light">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  navbar: {
    flex: 1
  },
  btnRadius: {
    borderRadius: '20px',
    color: '#fff'
  }
};

export default navbar;
