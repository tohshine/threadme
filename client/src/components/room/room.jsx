import React, { useEffect, useState } from 'react';
import { Drawer, Button } from 'antd';
import RoomList from './roomList';

const Modal = props => {
  const { onOpen, onClose, prop } = props;
  const [rooms, setrooms] = useState([]);
  const [activeUsers, setactiveUsers] = useState([]);

  useEffect(() => {
    prop.socket.on('rooms', ({ rooms }) => {
      setrooms(rooms);
    });
    prop.socket.on('users', ({ users }) => {
     
      setactiveUsers([...users]);
    });
  }, [rooms]);

  const screenWidth = window.screen.width;

  return (
    <div>
      <Drawer
        title="Currently Threading..."
        width={520}
        closable={true}
        onClose={onClose}
        visible={onOpen}
      >
        {screenWidth < 768 ? (
          <h4 className="all-center" style={{ marginLeft: '50px' }}>
            Sorry kindly switch to desktop or Ipad device
          </h4>
        ) : rooms.length === 0 ? (
          <h3>No active thread rooms</h3>
        ) : (
          rooms.map(rms => (
            <RoomList
              key={rms.id}
             room={rms.room}
             link={rms.link}
             creator={rms.name}
              activeUsers={activeUsers}
              prop={prop}
            />
          ))
        )}
      </Drawer>
    </div>
  );
};

export default Modal;
