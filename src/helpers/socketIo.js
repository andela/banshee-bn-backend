import socketIO from 'socket.io';

const socketIo = (server) => {
  const io = socketIO(server);
  const adminInApp = io
    .of('/admin/inapp')
    .on('connection', (socket) => {
      socket.emit('New connection', 'Connected');
      socket.on('New trip request', (data) => {
        io.of('/admin/inapp')
          .emit('New trip request', data);
      });
    });
};

export default socketIo;
