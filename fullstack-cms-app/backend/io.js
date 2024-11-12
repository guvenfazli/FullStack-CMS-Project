let io;

module.exports = {
  init: (serverLink, method) => {
    io = require('socket.io')(serverLink, method);
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('No socket found!')
    }
    return io
  }
}