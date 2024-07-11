const Group = require("../model/group.js")
const Groupmsg = require("../model/groupmsg.js")
const Addforum = async(data) => {
    console.log('it got here',data)
  const {groupid, sender, sendername, type, message } = data;
  try {
    const results = await Group.findById(groupid);
    if (!results) return
    const isBlocked = results.block.includes(sender);
    if(isBlocked) return
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







