const { validate: uuidValidate } = require("uuid");

function SocketJoin({ socket, io }) {
  socket.on("join", (id) => {
    //checking validity of coming joining id
    if (!uuidValidate(id)) {
      socket.emit("error", {msg:"Group Id not Valid"});
      return;
    }
    //
    //adding you in the id group if id is valid and room have vacancy 
    socket.join(id);

    let room = io.sockets.adapter.rooms;
    let roomById = room.get(id);
    let roomSize = roomById.size;
    console.log("roomSize", roomSize,roomById);

    //if 2 are already there then i should leave
    if (roomSize > 2) {
      socket.leave(id);
      socket.emit("error", { msg: "Room is Full" });
      return;
    }
    socket.emit("join", {msg:true})
  });
}

module.exports = SocketJoin;
