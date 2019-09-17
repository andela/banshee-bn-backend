import client from 'socket.io-client';

const port = process.env.PORT;
const socket = client.connect(process.env.NODE_ENV === 'production' ? 'https ://banshee-backend.herokuapp.com/admin/inapp' : `http://localhost:${port}/admin/inapp`);
/*
* @param(string) event
* @param(object) data
  @return
*/
const inAppBot = {
  send: (event, data) => {
    socket.emit(event, data);
  }
};

export default inAppBot;
