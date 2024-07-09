const Message = require("../model/message.js");
const User = require("../model/user.js");

const Addmessage = async (data) => {
  console.log('it got here', data);
  const { chatid, sender, receiver, type, message } = data;

  try {
    const receiverData = await User.findOne({ userid: receiver });
    if (receiverData && receiverData.block.includes(sender)) {
      return console.log('Sender is blocked by receiver.');
    }

    const newMessage = new Message({
      chatid,
      sender,
      receiver,
      type,
      message,
    });

    console.log(newMessage);
    await newMessage.save();
    console.log('Message saved successfully.');
  } catch (error) {
    console.log('Error saving message:', error);
  }
};

module.exports = Addmessage;