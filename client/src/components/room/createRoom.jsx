import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { joinRoom } from '../../action/joinAction';
import { connect } from 'react-redux';

const GetStarted = props => {
  const { onOpen, onClose, prop, createRoom, joinRoom } = props;
  const [form, setform] = useState({
    name: '',
    room: '',
    link: ''
  });
  const { socket, nextStep } = prop;

  const onChange = e => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onVerify = e => {
    e.preventDefault();

    const { name, room, link } = form;
    const details = { name, room, link };
    if (name === '' || room === '' || link === '') return;
    socket.emit('createRoom', { room, name, link }, ({ error, success }) => {
      if (success) {
        //redirect to chat route

        message.success(`${success}`);

        joinRoom(details);

        nextStep();
      } else if (error) {
        //do some error stuff

        return message.error(`${error}`);
      }
    });
    // console.log('null');
  };

  return (
    <div>
      <Modal
        title="Create a Room"
        visible={onOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <input
          type="text"
          onChange={onChange}
          name="name"
          placeholder="username"
        />
        <input
          type="text"
          onChange={onChange}
          name="room"
          placeholder="room title"
        />
        <input
          type="text"
          onChange={onChange}
          name="link"
          placeholder="github link"
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={onVerify}
        >
          Verify
        </button>
      </Modal>
    </div>
  );
};

export default connect(null, { joinRoom })(GetStarted);
