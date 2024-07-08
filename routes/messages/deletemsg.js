const Message = require("../../model/message.js");
async function Deletemsg(req, res) {
  const { userid } = req.user;
  const { id } = req.body;
  try {
    const response = await Message.deleteOne({
        _id:id,
        sender:userid
    })
    if(response.deletedCount === 1){
        return res.json({
            success: true,
            message: "Successfully returned",
            data: null,
          });
    }
    else {
        return res.json({
            success: false,
            message: "Unable to delete",
            data: null,
          });
    }
  } catch (error) {
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Error fetching ads",
      error: "Internal server error",
    });
  }
}

module.exports = Deletemsg;