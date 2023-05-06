const { v4: uuidv4 } = require("uuid");

function SocketStart({ socket }) {
  //in the starting will generate unique groupId
  socket.once("start", () => {
    //random unique id
    const id = uuidv4();
    socket.emit("start", { id });
  });
}

module.exports = SocketStart;
