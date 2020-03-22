import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layouts/navbar';
import Footer from '../layouts/footer';
import RoomsModal from './room/room';
import GetStartedModal from './room/createRoom';

import socketClient from 'socket.io-client';

const Join = props => {
  const [name, setname] = useState('');
  const [room, setroom] = useState('');
  const [visible, setvisible] = useState(false);
  const [getStarted, setgetStarted] = useState(false);

  const modalClose = () => {
    setvisible(false);
  };

  const closeModal = () => {
    setgetStarted(false);
  };
  

  return (
    <div className="container" style={styles.container}>
      <GetStartedModal
        onOpen={getStarted}
        onClose={closeModal}
        prop={props}
      />
      <RoomsModal onOpen={visible} onClose={modalClose} prop={props} />
      <Navbar />
      <div style={styles.content}>
        <div className="">
          <h1
            className="text-center"
            style={{ color: '#fff' }}
            data-aos="fade-right"
          >
            Welcome to chat{' '}
            <span className="text-danger" style={{ paddingRight: 10 }}>
              THRENDS
            </span>
            <br />
          </h1>
          <h6 className="x-small hr text-center" style={{ color: '#fff' }}>
            ....for developers & apprenticse
          </h6>
        </div>

        <div className="card" style={styles.conners}>
          <div className="form-container">
            <button
              type="submit"
              className="btn btn-block p"
              style={styles.getStartedButton}
              onClick={() => setgetStarted(true)}
            >
              Get Started
            </button>{' '}
            <br />
            <button
              type="submit"
              className="btn btn-block btn-success text-danger p"
              style={styles.conners}
              onClick={() => setvisible(true)}
            >
              Rooms
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  conners: {
    borderRadius: 10
  },
  getStartedButton: {
    backgroundColor: '#FF9F1C',
    color: '#FFF',
    borderRadius: 10
  },
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 10
  }
};

export default Join;
