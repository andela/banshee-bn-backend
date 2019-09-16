/**
 *
 * @param {string} style
 * @param {string} content
 * @return {string} string
 */
const index = (style, content) => `<!DOCTYPE html>
      <html>
        <head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
