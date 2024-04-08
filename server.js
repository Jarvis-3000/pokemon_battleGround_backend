const express = require("express");
const http = require("http");
const IO = require("./IO");
var axios = require("axios").default;
//Port from environment or default-5000
const PORT = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);

app.get("/",(req,res)=>{
    res.send("Hello Guys! This is a Node.js based server that is using Socket.io API to create a real-time communication between the players playing Pokemon BattleGround game and sharing game data in between.")
})

// connect Socket API
IO(server);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
