const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors');
const app = express();
const scraper = require('./scraper');
const port = 3000;

app.use(cors())

app.get('/', async(req, res) => {
  res.send(await scraper.scrape())
});

server = http.Server(app);
server.listen(port);
console.log(`Example app listening on port ${port}`);

io = socketIO(server, {cors : {
    origins: ['*'],
}});

io.on('connection', function (socket) {
  socket.emit('greeting-from-server', {
      combatants: scraper.scrape
  });
  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });
});