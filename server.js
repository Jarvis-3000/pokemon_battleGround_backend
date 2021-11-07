const express = require("express");
const http = require("http");
const IO = require("./IO");
const connectDB = require("./database/connectDB");
var axios = require("axios").default;
//Port from environment or default-5000
const PORT = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);

// connect Database
connectDB();
// connect Socket API
IO(server);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
