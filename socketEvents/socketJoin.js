const {AddSocket} = require("../controller")
const { validate: uuidValidate } = require("uuid");

function SocketJoin({ socket, io }) {
  socket.on("join", (id) => {
    let msg = {
      valid: true,
      roomFull: false,
    };

    //checking validity of coming joining id
    if (!uuidValidate(id)) {
      msg.valid = false;
      console.log("not valid");
      socket.emit("join", msg);
      return;
    }

    //adding you in the id group if id is valid and room have vacancy 
    socket.join(id);

    //adding you in the DB group
    AddSocket({groupId:id,socketId:socket.id})

    let room = io.sockets.adapter.rooms;
    let roomById = room.get(id);
    let roomSize = roomById.size;
    console.log("roomSize", roomSize);

    //if 2 are already there then i should leave
    if (roomSize > 2) {
      socket.leave(id);
      msg.roomFull = true;
    }
    socket.emit("join", msg);
    console.log("Joining...", msg.valid);
  });
}

module.exports = SocketJoin;
