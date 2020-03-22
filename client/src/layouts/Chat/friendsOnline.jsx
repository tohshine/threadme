import React from 'react';

const friendsOnline = ({ user }) => {
  console.log('online user',user);
  
  return (
    <div>
      <div style={{ display: 'flex' ,alignItems:"center"}}>
        <img src="./online.png" style={{ width: '10px' }} />{' '}
        <ul>
          <li>{user}</li>
        </ul>
      </div>
    </div>
  );
};

export default friendsOnline;
