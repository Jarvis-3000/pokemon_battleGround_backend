const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
      unique:true
    },
    countSocket:{
      type:Number,
      required:true,
      default:0
    },
    sockets: [
      {
        socketId: {
          type: String,
          required: true,
          ref: "Socket",
        },
      },
    ]
  },
  {
    timestamps: true,
  }
);

//to create a new User model
const Group = mongoose.model("Groups", groupSchema);

module.exports = Group
