import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import Header from '../layouts/Chat/chatHeader';
import Body from '../layouts/Chat/chatBody';
import NavBar from '../layouts/Chat/chatNavbar';
import FriendsOnline from '../layouts/Chat/friendsOnline';

const Chat = props => {
  const [message, setmessage] = useState('');
  const [messages, setmessages] = useState([]);
 
  const { prevStep, socket, details } = props;
  const { creator, name, link, room } = details;

  useEffect(() => {
    socket.emit('joinRoom', { name, room }, ({ success, error }) => {});
    console.log('useEffect in chat active');
  }, [socket]);
  useEffect(() => {});

  //listening forincoming messages
  useEffect(() => {
    socket.on('message', message => {
      setmessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => {
        setmessage('');
      });
    }
  };
  return (
    <div className="container" style={styles.container}>
      <NavBar />

      <div className="grid-2" style={styles.content}>
        <div className="card">
          <Header room={room} creator={creator} link={link} owner={name} />

          <Body message={messages} name={name} />

          <div
            className=""
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <input
              value={message}
              style={{
                padding: '5px',
                backgroundColor: '#c1c1',
                color: '#fff'
              }}
              type="text"
              placeholder="Type a message..."
              onChange={e => setmessage(e.target.value)}
              onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null)}
            />{' '}
            <button
              type="submit"
              className="btn  btn-primary text-light "
              style={{ borderRadius: '10px' }}
              onClick={sendMessage}
            >
              send
            </button>
          </div>
        </div>

        <div className="">
          <p className="text-center">Active users</p>{' '}
         
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 10
  },
  chatBody: {
    minHeight: '50vh',
    maxHeight: '60vh'
  }
};

const mapStateToProps = state => ({
  details: state.join
});

export default connect(mapStateToProps)(Chat);
