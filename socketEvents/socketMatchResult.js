const { validate: uuidValidate } = require("uuid");
//
//

function socketMatchResult({ socket, io }) {
  socket.on("matchStart", ({ groupId, details }) => {
    //
    if (!uuidValidate(groupId)) {
      socket.emit("error", { msg: "Group Id not Valid" });
      return;
    }
    //
    console.log("match start event", groupId, details);
    let players = getPlayers({ io, groupId });
    if (players[0] == socket.id) {
      io.to(players[1]).emit("getPokemonDetails", {details,id:socket.id});
    } else {
      io.to(players[0]).emit("getPokemonDetails", { details, id: socket.id });
    }
  });

  socket.on("lemmeChoose", (id) => {
    io.to(id).emit("error", { msg: "Let other player choose Pokemon" });
  });

  socket.on("matchResult", ({ details, groupId }) => {
    getMatchResult({ details, io, socket, groupId });
  });
}

function getPlayers({ io, groupId }) {
  let room = io.sockets.adapter.rooms;
  let roomById = room.get(groupId);
  let players = Array.from(roomById.values());

  return players;
}

function getMatchResult({ details, io, socket, groupId }) {
  pokemon1 = details[0];
  pokemon2 = details[1];
  let players = getPlayers({ io, groupId });
  let player1 = "";
  let player2 = "";


  if (players[0] == socket.id) {
    player1 = players[0];
    player2 = players[1];
  } else {
    player2 = players[0];
    player1 = players[1];
  }

  if (pokemon1.height * pokemon2.weight >= pokemon2.height * pokemon2.weight) {
    //socket.id won
    io.to(player1).emit("matchResult", { win: true, msg: "You Won" });
    io.to(player2).emit("matchResult", { win: false, msg: "You Lost" });
  } else {
    io.to(player2).emit("matchResult", { win: true, msg: "You Won" });
    io.to(player1).emit("matchResult", { win: false, msg: "You Lost" });
  }
}

module.exports = socketMatchResult;
