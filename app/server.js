const config = require('./config/');
const { app, server, io } = require('./lib/server.js');

/**
 * Remove item from list and return it.
 * @param {any} item
 * @param {Array.<any>} list
 */
function removeItem(item, list) {
  let index = list.indexOf(item);
  if (index === -1)
    throw new Error('Item not found in list.');
  list.splice(index, 1);
}

/**
 * Controller for main route.
 */
app.get('/', (req, res) => {
  res.render('main', config.view);
});

io.on('connection', socket => {
  socket.on('chat message', message => io.emit('chat message', message));
});

server.listen(config.server.port, config.server.log);
