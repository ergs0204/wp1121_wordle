import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({ path: '../.env.local' });

const app = express();
app.use(cors());
const server = createServer(app);
const rooms = new Map();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  const updatePlayers = (roomCode) => {
    const room = rooms.get(roomCode);
    if (room) {
      const playersInfo = Object.entries(room).map(([id, player]) => ({
        id,
        ready: player.ready
      }));
      io.to(roomCode).emit("update-players", playersInfo);
    }
  };

  socket.on("create-room", (roomCode) => {
    if (rooms.has(roomCode)) {
      socket.emit("room-exists", roomCode);
    } else {
      rooms.set(roomCode, { [socket.id]: { ready: false } });
      socket.join(roomCode);
      socket.emit("room-created", roomCode);
      updatePlayers(roomCode);
    }
  });

  socket.on("join-room", (roomCode) => {
    if (rooms.has(roomCode)) {
      const room = rooms.get(roomCode);
      if (Object.keys(room).length < 2) {
        room[socket.id] = { ready: false };
        socket.join(roomCode);
        updatePlayers(roomCode);
      } else {
        socket.emit("room-full", roomCode);
      }
    } else {
      socket.emit("room-does-not-exist", roomCode);
    }
  });

  socket.on("player-ready", (roomCode) => {
    const room = rooms.get(roomCode);
    if (room && room[socket.id]) {
      room[socket.id].ready = true;
      updatePlayers(roomCode);
      const allReady = Object.values(room).every(player => player.ready);
      if (allReady && Object.keys(room).length === 2) {
        io.to(roomCode).emit("start-game");
        Object.keys(room).forEach(playerId => {
          io.sockets.sockets.get(playerId)?.join("playing" + roomCode);
        });
      }
    }
  });

  socket.on("player-not-ready", (roomCode) => {
    const room = rooms.get(roomCode);
    if (room && room[socket.id]) {
      room[socket.id].ready = false;
      updatePlayers(roomCode);
    }
  });
  socket.on("leave-room", (roomCode) => {
    socket.leave(roomCode);
    rooms.forEach((room, roomCode) => {
      if (room[socket.id]) {
        delete room[socket.id];
        if (Object.keys(room).length === 0) {
          rooms.delete(roomCode);
        } else {
          updatePlayers(roomCode);
        }
      }
    });
  });

  socket.on("set-problem", (solution, roomCode) => {
    socket.to("playing"+roomCode).emit("get-problem", solution);
  });

  socket.on("guess", (formattedGuess, roomCode, turn) => {
    socket.to("playing"+roomCode).emit("get-guess", formattedGuess, turn);
  });

  socket.on("end-game", (isCorrect, turn, roomCode) => {
    socket.to("playing"+roomCode).emit("opponent-end-game", isCorrect, turn);
  });

  socket.on("play-again", (roomCode) => {
    socket.to("playing"+roomCode).emit("opponent-play-again");
  });
  
  socket.on("disconnect", () => {
    rooms.forEach((room, roomCode) => {
      if (room[socket.id]) {
        delete room[socket.id];
        if (Object.keys(room).length === 0) {
          rooms.delete(roomCode);
        } else {
          updatePlayers(roomCode);
        }
      }
    });
    console.log("A user disconnected");
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
