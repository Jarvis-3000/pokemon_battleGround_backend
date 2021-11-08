const GetRandomPokArray = require("../randomArray/randomArray");

function getPlayers(io,groupId){
  let room = io.sockets.adapter.rooms;
  let roomById = room.get(groupId);
  let players = Array.from(roomById.values());

  return players
}


function SocketStartGame({ socket, io }) {
  socket.once("startGame", (groupId) => {
    console.log("starting game", groupId);
    //
    const randomArr = GetRandomPokArray();
    let players=getPlayers(io,groupId)
    //verifying existence of both player
    if(players.length!=2){
      socket.emit("warning","Let other player join!!!")
      return
    }
    console.log("broadcasted");
    //emitting player pokemons to each
    io.to(players[0]).emit("startGame",randomArr.player1)
    io.to(players[1]).emit("startGame",randomArr.player2)
    console.log("broadcasted to each");
  });
}

module.exports = SocketStartGame;
