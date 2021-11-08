const { SocketRegister, CreateGroup} = require("../controller.js");
const { v4: uuidv4 } = require("uuid");

function SocketStart({ socket }) {
  //in the starting will generate unique groupId
  socket.once("start", () => {
    //random unique id
    console.log("starting...")
    const id = uuidv4();
    SocketRegister({ socketId: socket.id });
    CreateGroup({groupId:id})
    socket.emit("start", { id });
  });
}

module.exports = SocketStart;
