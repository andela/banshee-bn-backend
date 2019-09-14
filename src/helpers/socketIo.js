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
  const comment = io
    .of('/comment')
    .on('connection', (socket) => {
      socket.emit('New connection', 'Connected to comment space');
      socket.on('Comment', (data) => {
        socket.join(data.companyId);
        return io.of('/comment')
          .to(data.companyId)
          .emit('Comment', data);
      });
    });
};

export default socketIo;
