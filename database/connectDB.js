const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const ConnectDB = async () => {
  console.log("Connecting...", process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = ConnectDB;
