import React from 'react';
//react notification component
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const notification = ({ message }) => {
  console.log('not', message);

  //notification function
  function Notification() {
    return (
      <div
        style={{
          display: 'flex',
          /*  padding: '11px 6px', */
          width: '100%',
          height: 62,
          backgroundColor: '#0f2f26',
          color: 'white',
          borderRadius: 5
        }}
      >
        <img
          src="./threndLogo.jpg"
          style={{
            display: 'flex',
            height: 60,
            width: 60
          }}
        />
        <div style={{ margin: '0 0 0 5px', color: '#FAE042' }}>
          <h4 style={{ margin: '5px 0', color: 'rgb(183, 162, 35)' }}>
            status
          </h4>
          <p style={{ margin: 0, color: '#FAE042' }}>{message}</p>
        </div>
      </div>
    );
  }

  return store.addNotification({
    content: Notification, // 👈
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000
    }
  });
};

export default notification;
