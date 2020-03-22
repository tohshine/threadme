import React, { useState, useEffect } from 'react';
import { Input, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { joinRoom } from '../../action/joinAction';
import { connect } from 'react-redux';
const RoomList = props => {
  const { room, link, creator, activeUsers, prop, joinRoom } = props;

  const [name, setname] = useState('');
  const [numberOfUsers, setnumberOfUser] = useState('');
  const details = { room, name, creator, link };

  useEffect(() => {
    const popultion = activeUsers.filter(
      numOfusers => numOfusers.room === room
    );

    setnumberOfUser(popultion.length);
  });

  const join = event => {
    if (name === '') return;
    if (event.keyCode === 13) {
      joinRoom(details);
      prop.nextStep();
    }
  };

  //list population of user in a room
  const userPopulation = () => {};

  return (
    <div className="card ">
      <div style={card}>
        <pre className="text-dark">{room}</pre>
        <Badge count={numberOfUsers} style={{ marginBottom: '10px' }} />
      </div>
      <Input
        size="small"
        placeholder="Enter name to join"
        prefix={<UserOutlined />}
        onChange={e => setname(e.target.value)}
        onKeyDown={join}
      />
    </div>
  );
};

const card = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginButtom: '10px'
};
export default connect(null, { joinRoom })(RoomList);
