const { validate: uuidValidate } = require("uuid");
//
//
const GetRandomPokArray = require("../randomArray/randomArray");

function getPlayers(socket, io, groupId) {
  //
  if (!uuidValidate(groupId)) {
    socket.emit("error", { msg: "Group Id not Valid" });
    return;
  }
  //
  let room = io.sockets.adapter.rooms;
  let roomById = room.get(groupId);
  let players = Array.from(roomById.values());

  return players;
}

function SocketStartGame({ socket, io }) {
  socket.once("startGame", (groupId) => {
    //
    if (!uuidValidate(groupId)) {
      socket.emit("error", { msg: "Group Id not Valid" });
      return;
    }
    //
    console.log("starting game", groupId);

    let players = getPlayers(socket, io, groupId);
    if (!players) {
      return;
    }
    //verifying existence of both player
    if (players.length != 2) {
      socket.emit("error", {msg:"Let other player join!!!"});
      return;
    }
    const randomArr = GetRandomPokArray();
    console.log("broadcasted");
    //emitting player pokemons to each
    io.to(players[0]).emit("startGame", randomArr.player1);
    io.to(players[1]).emit("startGame", randomArr.player2);
    console.log("broadcasted to each");
  });
}

module.exports = SocketStartGame;
