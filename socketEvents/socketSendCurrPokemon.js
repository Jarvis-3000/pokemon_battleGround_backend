function getPlayers(io, groupId) {
  let room = io.sockets.adapter.rooms;
  let roomById = room.get(groupId);
  let players = Array.from(roomById.values());

  return players;
}

function socketSendCurrentPokemon({ socket, io }) {
  socket.on("sendCurrentPokemon", ({ pokemon, groupId }) => {
    let players = getPlayers(io, groupId);
    if (players[0] == socket.id) {
      io.to(players[1]).emit("sendCurrentPokemon", pokemon);
      console.log("sending pokemon to opponent", players[1]);
    } else {
      io.to(players[0]).emit("sendCurrentPokemon", pokemon);
      console.log("sending pokemon to opponent", players[0]);
    }
  });
}

module.exports = socketSendCurrentPokemon;
