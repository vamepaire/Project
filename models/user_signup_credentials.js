const mongoose = require("mongoose");

const userDB = mongoose.createConnection(`mongodb://localhost:27017/UserData`);

const User = mongoose.Schema({
      username: {
    type: String,
    required: true,
  },
    email: {
        type: String,
        required: true
  },
    phone: {
        type: Number,
        required: true
  },
    password: {
        type: String,
        required: true
  }
});

module.exports = userDB.model("userdata", User);