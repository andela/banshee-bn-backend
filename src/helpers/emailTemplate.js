const template = (title, body) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500" rel="stylesheet">
    <style>
      * {font-family: 'Roboto Mono',monospace;}
      .container {width: 80%; max-width: 60em; margin: 0 auto;background: #fbfbfb;padding: 30px;color:#000}
      .username {font-size: 1rem;}
      .message{font-size: 1rem;line-height: 1.5;}
      .btn {display: inline-block;background: #A200A7;padding: 10px; color: #fff !important;text-decoration: none;font-size: 1rem;}
    </style>
  </head>
  <body>
    <div class="container">
      <h2>${title}</h2>
      <p>${body}</p>
    </div>
  </body>
</html>`;

export default template;
