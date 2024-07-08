
const Groupmsg = require("../model/groupmsg.js")
const Addforum = (data) => {
    console.log('it got here',data)
  const {groupid, sender, sendername, type, message } = data;
  try {
    const newMessage = new Groupmsg({
      groupid,
      sender,
      sendername,
      type,
      message
    })
    console.log(newMessage,"here o")
    newMessage.save()
  } catch (error) {
    console.log(error);
  }
};

module.exports = Addforum;






















