const Group = require("./database/groupModel.js");
const Socket = require("./database/socketModel.js");

const SocketRegister = async ({ socketId }) => {
  try {
    console.log("adding socketId...");
    const newSocket = new Socket({ socketId });
    await newSocket.save();
    return { msg: "Successfull Registered!!!" };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

const CreateGroup = async ({ groupId }) => {
  try {
    console.log(`Creating  group ${groupId}`);
    const group = new Group({ groupId: groupId });
    await group.save();
    return { msg: "Successfull Added!!!" };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

const AddSocket = async ({ groupId, socketId }) => {
  try {
    console.log(`Adding ${socketId} to group ${groupId}`);

    //updating
    await Group.updateOne(
      {
        groupId: groupId,
      },
      {
        $push: { sockets: { socketId: socketId } },
      }
    );
    await Group.updateOne(
      {
        groupId: groupId,
      },
      {
        $inc: { countSocket: 1 },
      }
    );

    return { msg: "Successfull Added!!!" };
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

// const GetPlayers=()=>{
//   try{



//   }
//   catch(){

//   }
// }



module.exports = { SocketRegister, AddSocket, CreateGroup };
