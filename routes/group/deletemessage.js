const Groupmsg = require("../../model/groupmsg.js");
async function Deleteforummsg(req, res) {
  const { userid } = req.user;
  const { id } = req.body;
  try {
    const response = await Groupmsg.deleteOne({
        _id:id,
        sender:userid
    })
    if(response.deletedCount === 1){
        return res.json({
            success: true,
            message: "Successfully deleted",
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
      message: "Error deleting message",
      error: "Internal server error",
    });
  }
}

module.exports = Deleteforummsg;