const port = process.env.PORT;
const url = process.env.NODE_ENV === 'production' ? 'https ://banshee-backend.herokuapp.com/admin/inapp' : `'http://localhost:${port}/admin/inapp'`;
const script = `
        const email = 'banshee.admin@gmail.com';
        const appendMessage = (data) => {
            const elem = document.createElement('li');
            elem.innerHTML = data.message;
            const messageList = document.getElementById("notificationList");
            messageList.appendChild(elem);
        }
        const adminInAppClient = io.connect(${url});
         adminInAppClient.on('New connection', (data) => {
            adminInAppClient.emit('User info', {email});
         });
         
        adminInAppClient.on('New trip request', (data) => {
            if(data.recipients.includes(email)){
                appendMessage(data);
            }
            
    });`;

export default script;
