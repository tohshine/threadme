const axios = require('axios');

const userSetup = io => {
  io.on('connection', socket => {
    console.log(`client with id of ${socket.id} is connected`);
    //const rooms = io.sockets.adapter;
    //console.log(rooms.rooms.expressjs);
    //?to know the population of users in a room
    joinRoom(socket, io);
    //getUser(socket, io);
    createRoom(socket, io);
    getUsersInRoom(socket, io);
    sendingMessage(socket, io);
    getAllRoomName(socket);

    socket.on('disconnect', () => {
      console.log(`client with socket if of ${socket.id} disconnected`);
      removeUser(socket, io);
    });
  });
};

const config = {
  'content-Type': 'application/json'
};

const createRoom = socket => {
  socket.on('createRoom', async ({ room, name, link }, callback) => {
    room = room.trim().toLowerCase();
    name = name.trim().toLowerCase();
    console.log(room, name, link);
    console.log('in createroom');

    try {
      const isRoom = await axios.get('http://localhost:5000/admins');
      const roomExist = isRoom.data.find(
        rm => rm.room === room && rm.name === name
      );
      if (roomExist) {
        return callback({ error: 'username or room already exist!!!' });
      }

      const createdRoom = { id: socket.id, room, name, link };
      await axios.post('http://localhost:5000/admins', createdRoom, config);
      socket.join(createdRoom.room);
      callback({ success: 'room was succesfully created' });
    } catch (error) {
      console.log(error);
    }
  });
};
const joinRoom = socket => {
  socket.on('joinRoom', async ({ name, room }, callback) => {
    name = name.trim().toLowerCase();
    console.log('user room join', socket.id);

    //const rooms = io.sockets.adapter
    //rooms.rooms.test.length //?to know the population of users in a room
    const isRoom = await axios.get('http://localhost:5000/admins');
    const roomExist = isRoom.data.find(rm => rm.room === room);
    if (roomExist) {
      const joinedUser = { id: socket.id, name, room };
      await axios.post('http://localhost:5000/users', joinedUser, config);
      callback({ success: 'welcome' });
      //greeting new joined user
      socket.emit('message', {
        user: 'admin',
        text: `${joinedUser.name},welcome to ${joinedUser.room}`
      });

      //alerting room of newly joined user
      socket.broadcast.to(joinedUser.room).emit('message', {
        user: 'admin',
        text: `${joinedUser.name} has joined`
      });

      //user joining room
      return socket.join(joinedUser.room);
    } else {
      return callback({ error: 'room does not available check later!!!' });
    }
  });
};

const sendingMessage = (socket, io) => {
  socket.on('sendMessage', async (message, callback) => {
    console.log('user sent message', socket.id);

    const users = await axios.get('http://localhost:5000/users');
    const senderDetails = users.data.find(details => details.id === socket.id);
    if (senderDetails) {
      const { room, name } = senderDetails;
      io.to(room).emit('message', { user: name, text: message });
      callback();
    } else {
      console.log('senderID', socket.id);

      console.log('no id');
    }
  });
};

//getting profile of created room owner
const adminProfile = async socket => {
  const adminProfile = await axios.get('http://localhost:5000/admins');
  const profile = adminProfile.data.find(profile => profile.id === socket.id);
  if (profile) {
    socket.emit('profile', { profile });
  }
};

const getUsersInRoom = async socket => {
  const users = await axios.get('http://localhost:5000/users');
  console.log('userInROom', users.data);

  return socket.emit('users', { users: users.data });
};

const getAllRoomName = async socket => {
  const rooms = await axios.get('http://localhost:5000/admins');
  socket.emit('rooms', { rooms: rooms.data });
};

const removeUser = async (socket, io) => {
  const users = await axios.get(`http://localhost:5000/users/${socket.id}`);
  console.log(users.data);

  io.to(users.data.room).emit('message', {
    user: 'admin',
    text: `${users.data.name} has left`
  });

  return await axios.delete(`http://localhost:5000/users/${socket.id}`);
};

module.exports = { userSetup };
