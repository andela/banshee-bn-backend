import socketIO from 'socket.io';
import socketIOSpace from './socektIoSpace';

let onlineUsers = [];
const socketIo = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    socket.emit('New connection', 'Connected');
    socket.on('Users info', (data) => {
      const { id } = socket;
      socket.user = data.email;
      socket.join(data.companyId);
      const userExist = onlineUsers.find((user) => user.email === data.email);
      if ((userExist && userExist.clientId !== id)) {
        const newOnlineUsers = onlineUsers.filter((user) => user.email !== data.email);
        onlineUsers = [...newOnlineUsers, { ...data, clientId: id }];
      } else if (!userExist) {
        onlineUsers.push({ ...data, clientId: id });
      }
      const usersFromXCompany = onlineUsers.map((user) => {
        if (user.companyId === data.companyId) {
          return user;
        }
        return null;
      }).filter((user) => user !== null);
      io.to(data.companyId).emit(data.companyId, { usersFromXCompany, client: data.email });
    });
  });

  socketIOSpace(
    io,
    '/trip',
    'New trip request',
    'New trip request alert'
  );

  socketIOSpace(
    io,
    '/comment',
    'New comment',
    'New comment alert'
  );
};

export default socketIo;
