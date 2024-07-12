const Chat = require("../../model/chat.js");
const Block = require("../../model/block.js");
const User = require("../../model/user.js")
const generateString = require("../../services/generate.js");
const getProfile = require("../../services/getProfile.js");

 async function Createmessage(req, res) {
  const { userid } = req.user;
  const { friendid, friendname } = req.body;

  if (friendid === userid) {
    return res.json({
      success: false,
      message: "You can't send message to yourself",
    });
  }
  if (friendid === "" || friendname === "") {
    return res.json({ success: false, message: "Error validating Input" });
  }
  const check = await CheckBlock(userid,friendid)
  if(!check){
    return res.json({
      success: false,
      message: "This user Blocked you",
    });
  }
  const ChatRecord = await CheckChat(userid,friendid)
  if(ChatRecord.success){
    return res.json({
      success: true,
      message: "You are already in conversation with this user",
      data: ChatRecord.chatid,
      record:"old"
    });
  }
  try {
    const response = await getProfile(userid);
    const { displayname, lastname } = response;

    const chatid = await generateString();

    const newChat = new Chat({
      chatid,
      firstid:userid,
      secondid:friendid,
      firstname:displayname,
      secondname:friendname
    }) 
    console.log(newChat)
    await newChat.save()
    return res.json({
      success: true,
      message: "Message Sent",
      data: {chatid,userid},
      record:"new"
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message:
        "There is an issue with sending this user a message. Kindly try again later.",
    });
  }
};

async function CheckBlocuk (first,second) {
  try{
      const checkFirst = await Block.find({
        $or:[
          {$and:[{blockerid:first},{blockeeid:second}]},
          {$and:[{blockeeid:first},{blockerid:second}]}
        ]
      })
      console.log("reached here",checkFirst)
      if(checkFirst.length > 0){
        return false
      }
      else {
        return true
      }
     
  }
  catch(err){
    console.log(err)
    throw err
  }
}
async function CheckChat (first,second) {
  try{
      const checkFirst = await Chat.findOne({
        $or:[
          {$and:[{firstid:first},{secondid:second}]},
          {$and:[{secondid:first},{firstid:second}]}
        ]
      })
     
      console.log("reached here",checkFirst)
      if(checkFirst){
        if(checkFirst.deleted.includes(first)){
          await Chat.updateOne(
            { _id: checkFirst._id },
            { $pull: { deleted: first } }
          );
        }
        const result = checkFirst.chatid;
        const load = {
          chatid:result,
          success:true
        }
        return load
      }
      else {
        const load = {
          chatid:null,
          success:false
        }
        return load
      }
     
  }
  catch(err){
    console.log(err)
    throw err
  }
}
async function CheckBlock (first,second) {
  try{
      const results = await User.findOne(
        {userid:second}
      )
      const isBlocked = results.block.includes(first)
      if(isBlocked){
        return false
      }
      else {
        return true
      }

  }
  catch(err){
    console.log(err)
    throw err
  }
}
module.exports = Createmessage;
