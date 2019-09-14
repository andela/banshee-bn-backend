const socketIOSpace = (io, namespace, onEvent, emitEvent) => io
  .of(`${namespace}`)
  .on('connection', (socket) => {
    socket.on(`${onEvent}`, (data) => {
      socket.join(data.companyId);
      if (io.sockets.adapter.rooms[data.companyId] !== undefined) {
        const { inAppRecipients } = data;
        const clients = io.sockets.adapter.rooms[data.companyId].sockets;
        const clientIds = Object.keys(clients);
        clientIds.map((clientId) => {
          // this is the socket of each client in the room.
          const clientSocket = io.sockets.connected[clientId];
          // you can do whatever you need with this
          if (inAppRecipients.includes(clientSocket.user)) {
            clientSocket.emit(`${emitEvent}`, data);
          }
        });
      }
    });
  });

export default socketIOSpace;
