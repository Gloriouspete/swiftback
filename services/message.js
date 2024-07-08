const Message = require("../model/message.js")
const Addmessage = (data) => {
    console.log('it got here',data)
  const { chatid, sender, receiver, type, message } = data;
  try {
    const newMessage = new Message({
      chatid,
      sender,
      receiver,
      type,
      message
    })
    console.log(newMessage)
    newMessage.save()
  } catch (error) {
    console.log(error);
  }
};

module.exports = Addmessage;
