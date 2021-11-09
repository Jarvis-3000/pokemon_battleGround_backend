function SocketDisconnect({ socket, io }) {
  //A special namespace "disconnect" for when a client disconnects
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
}

module.exports = SocketDisconnect;
