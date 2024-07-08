const Message = require("../../model/message.js");

async function Getmessages(req, res) {
  const { userid } = req.user;
  const { params } = req.body;
  if(!params){
    return res.json({ success: false, message: "The resource sent is empty" });
  }
  try{
    const results = await Message.find({
      $or: [{ sender: userid }, { receiver: userid }],
      $and:{chatid:params}
    });
    if (results.length === 0) {
      return res.json({ success: false, message: "Messages not found" });
    }
    return res.json({
      success: true,
      message: "Successfully returned",
      data: results,
    });
   
  }
  catch(error){
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Error fetching ads",
      error: "Internal server error",
    });
  }
}
module.exports = Getmessages;