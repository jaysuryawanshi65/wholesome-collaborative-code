const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./Actions');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true, credentials: true } });
const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(socketId => ({
    socketId,
    username: userSocketMap[socketId]
  }));
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'collaborative-editor' }));

io.on('connection', socket => {
  console.log('socket connected:', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    if (!roomId || !username) return;
    userSocketMap[socket.id] = String(username).trim();
    socket.join(String(roomId));
    const clients = getAllConnectedClients(String(roomId));
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username: userSocketMap[socket.id],
        socketId: socket.id
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    if (roomId == null) return;
    socket.in(String(roomId)).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    if (socketId) io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.LEAVE, () => socket.disconnect(true));

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach(roomId => {
      if (roomId === socket.id) return;
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id]
      });
    });
  });

  socket.on('disconnect', () => {
    delete userSocketMap[socket.id];
    console.log('socket disconnected:', socket.id);
  });
});

const clientBuild = path.join(__dirname, '..', 'client', 'build');
if (require('fs').existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
