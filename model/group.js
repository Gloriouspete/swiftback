const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  image: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  adminname: {
    type: String,
    required: true,
  },
  members:[ {
    type: String,
  }],
  block: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;