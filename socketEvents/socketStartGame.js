function SocketStartGame({ socket, io }) {
  socket.once("startGame", () => {
    console.log("starting game")
    socket.emit("startGame");

    
  });
}

module.exports = SocketStartGame;
