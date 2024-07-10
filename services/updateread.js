const Message = require("../model/message.js");
async function Updateread(chatid, sender) {
  console.log(chatid, sender + "pol");
  if (chatid === undefined || sender === undefined) {
    return;
  }
  try {
    await Message.updateMany({ chatid, sender }, { $set: { status: "seen" } });
    return true;
  } catch (error) {
    console.log(error);
  }
}
module.exports = Updateread;
