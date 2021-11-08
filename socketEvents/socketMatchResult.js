function getPlayers({ io, groupId }) {
  console.log("get players", groupId);
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

  console.log("players result", players);

  if (players[0] == socket.id) {
    player1 = players[0];
    player2 = players[1];
  } else {
    player2 = players[0];
    player1 = players[1];
  }

  if (pokemon1.height * pokemon2.weight >= pokemon2.height * pokemon2.weight) {
    //socket.id won
    io.to(player1).emit("matchResult", "You Won!!!");
    io.to(player2).emit("matchResult", "You Lost");
    console.log("won", player1);
  } else {
    io.to(player2).emit("matchResult", "You Won!!!");
    io.to(player1).emit("matchResult", "You Lost");

    console.log("won", player2);
  }
}

function socketMatchResult({ socket, io }) {
  socket.on("matchStart", ({ groupId, details }) => {
    console.log("match start event", groupId, details);
    let players = getPlayers({ io, groupId });
    if (players[0] == socket.id) {
      io.to(players[1]).emit("getPokemonDetails", details);
      console.log("sending pokemon to opponent", players[1]);
    } else {
      io.to(players[0]).emit("getPokemonDetails", details);
      console.log("sending pokemon to opponent", players[0]);
    }
  });

  socket.on("matchResult", ({ details, groupId }) => {
    console.log("got the final details", details, groupId);
    getMatchResult({ details, io, socket, groupId });
  });
}

module.exports = socketMatchResult;
