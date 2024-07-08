const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  blockerid: {
    type: String,
    required: true,
  },
  blockeeid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Block = mongoose.model("Block", blockSchema);

module.exports = Block;
