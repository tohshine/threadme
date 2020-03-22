import React, { useState, useEffect } from 'react';
import Chat from './chat';
import Join from './home';
import io from 'socket.io-client';
let socket;
const ENDPOINT = 'http://threadme.herokuapp.com/';
socket = io(ENDPOINT);
console.log('index page', socket);
const Index = () => {
  useEffect(() => {
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT]);

  const [step, setstep] = useState(1);

  const nextStep = () => {
    return setstep(step + 1);
  };
  const prevStep = () => {
    return setstep(step - 1);
  };

  switch (step) {
    case 1:
      return <Join nextStep={nextStep} socket={socket} />;

    case 2:
      return <Chat prevStep={prevStep} socket={socket} />;

    default:
      return step;
  }
};

export default Index;
