const mongoose = require("mongoose");

const groupmsgSchema = new mongoose.Schema({
  groupid: {
    type: String,
    required: true,
  },
  sender: {
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
  sendername: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

const Groupmsg = mongoose.model("Groupmsg", groupmsgSchema);

module.exports = Groupmsg;
