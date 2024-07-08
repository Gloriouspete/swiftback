const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatid: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "sent",
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
