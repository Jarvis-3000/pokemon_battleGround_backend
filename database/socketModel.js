const mongoose = require("mongoose");

const socketSchema = mongoose.Schema(
  {
    socketId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      default:"user"
    },
    groups: [
      {
        groupId: {
          type: String,
          required: true,
        },
        pokemons: [
          {
            name: {
              type: String,
              required: true,
            },
          },
        ],
        opponent: {
          type: String,
          required:true,
          default:"Opponent"
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//to create a new User model
const Socket = mongoose.model("Socket", socketSchema);

module.exports=Socket
