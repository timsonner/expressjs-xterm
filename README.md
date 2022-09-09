# Interactive web-based terminal

## Based on a project by EddyMens
https://github.com/EDDYMENS/interactive-terminal

## Requirements:
- NodeJS >= v16 and NPM

## Setup process
There are two parts to this, the frontend and backend, just like a typical web application.

To get the backend running use the following steps:

- `cd` into the project directory.
- Run `npm install` to pull in dependencies.
- Run `node server.js` to start the WebSocket the frontend will be connecting to.
alernatively:
- Run `nodemon server.js`

Open http://localhost:3000/ in the browser.

The WebSocket port number is hard coded thus `6060`. Feel free to change it in `server.js`
Also, don't forget to update the WebSocket URL in `index.js` after.

There is also a complete tutorial  detailing how different parts of the code work.  
https://www.eddymens.com/blog/creating-a-browser-based-interactive-terminal-using-xtermjs-and-nodejs


## TODO:
- [] Enable key combo detection (ctrl-c,etc)
- [] Enable arrow key usage.
- [] Enable tab for autocomplete.
