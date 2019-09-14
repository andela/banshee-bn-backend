const connectionScript = (email, companyId) => {
  const port = process.env.PORT;
  const url = process.env.NODE_ENV === 'production' ? '\'https://banshee-backend.herokuapp.com\'' : `'http://localhost:${port}'`;
  return `
    const email = '${email}';
    const companyId = '${companyId}';
    const inAppClient = io.connect(${url});
    const appendMessage = (data) => {
        const elem = document.createElement('li');
        elem.innerHTML = data.message;
        const messageList = document.getElementById("notificationList");
        messageList.appendChild(elem);
    }

    inAppClient.on('New connection', (data) => {
      inAppClient.emit('Users info', {email, companyId});
    });

    inAppClient.on(companyId, (data) => {
      console.log(data);
    });
  `;
};

const eventScript = (onEvent) => `
    inAppClient.on('${onEvent}', (data) => {
        console.log(data);
        if(data.inAppRecipients.includes(email)){
            appendMessage(data);
        }
    });
  `;

export {
  connectionScript,
  eventScript
};
