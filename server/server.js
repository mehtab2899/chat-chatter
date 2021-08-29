import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import { userJoin, userLeaves, getCurrentUser, getRoomUsers } from "./users.js";

// env config
dotenv.config();

// config app
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

// * deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// socketio
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);

    // welcome current user
    socket.emit("message", {
      user: "Chat Boat",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Chat Boat", text: `${user.name} has joined!` });

    // get all user of the room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // listen  for chat message
  socket.on("chatMessage", (msg, cb) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: msg });
    cb();
  });

  // when user disconnect
  socket.on("disconnect", () => {
    const user = userLeaves(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left the chat`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// config port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
