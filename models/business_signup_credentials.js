const mongoose = require("mongoose");

const signupDB = mongoose.createConnection(
  "mongodb://localhost:27017/credentials");

const signup_data = mongoose.Schema({
  b_name: {
    type: String,
    required:true
  },
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

module.exports = signupDB.model("signupdata", signup_data);