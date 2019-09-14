const index = (style, content, script) => `<!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
           <script>
              ${script}
           </script>
          <style>
            ${style}
          </style>
        </head>
        <body>
          ${content}
        </body>
    </html>
  `;

export default index;
