const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const helperUser = require('./helper/users');

const io = socketio(server);

helperUser.userSetup(io);

app.use(require('./router'));

//serve static asset in production
if (process.env.NODE_ENV === 'production') {
  //server asset
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
