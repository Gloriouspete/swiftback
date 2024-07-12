const Chat = require("../../model/chat.js");
const Message = require("../../model/message.js");
async function Deletechat(req, res) {
  const { userid } = req.user;
  const { chatid } = req.body;

  if (!chatid) {
    return res.json({
      success: false,
      message: "The resource sent is empty. Please provide a valid chat ID.",
    });
  }

  try {
    const chat = await Chat.findOne({ chatid });

    if (!chat) {
      return res.json({
        success: false,
        message: "chat not found. It may have been deleted already.",
      });
    }

    await Chat.updateOne({ chatid: chatid }, { $push: { deleted: userid } });
    await Message.deleteMany({ sender: userid });

    return res.json({
      success: true,
      message: "Successfully deleted the chat.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Unable to delete chat.",
      error: error.message,
    });
  }
}

module.exports = Deletechat;
