const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatid: {
    type: String,
    required: true,
    unique: true,
  },
  firstid: {
    type: String,
    required: true,
  },
  secondid: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  secondname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;