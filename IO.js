const SocketStart = require("./socketEvents/socketStart");
const SocketJoin = require("./socketEvents/socketJoin");
const SocketStartGame = require("./socketEvents/socketStartGame");
const SocketDisconnect = require("./socketEvents/socketDisconnect");
const SocketSendCurrentPokemon = require("./socketEvents/socketSendCurrPokemon");
const SocketMatchResult=require("./socketEvents/socketMatchResult")
const socketIO = require("socket.io");

function IO(server) {
  // setting up socket API and CORS handling
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  // Setting up socket with namespace connection
  io.on("connection", (socket) => {
    console.log("new client connected");

    //handling start event on socket
    SocketStart({ socket, io });

    //handling join event on socket
    SocketJoin({ socket, io });

    //handling start game event on socket
    SocketStartGame({ socket, io });

    //handlind disconnect event on socket
    SocketDisconnect({ socket, io });

    //handling send current pokemon to each other
    SocketSendCurrentPokemon({ socket, io });

    //handling send current pokemon to each other
    SocketMatchResult({ socket, io });
  });
}

module.exports = IO;
