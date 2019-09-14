import client from 'socket.io-client';

const port = process.env.PORT;
/*
* @param(string) event
* @param(object) data
* @param(string) namespace
  @return
*/
const inAppBot = {
  send: (event, data, namespace) => {
    const socket = client.connect(process.env.NODE_ENV === 'production' ? `https://banshee-backend.herokuapp.com/${namespace}` : `http://localhost:${port}/${namespace}`);
    socket.emit(event, data);
  }
};

export default inAppBot;
