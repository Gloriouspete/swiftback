const User = require("../../model/user.js");

async function Unblock(req, res) {
  const { userid } = req.user;
  const { friendid } = req.body;

  if (!friendid) {
    return res.json({
      success: false,
      message: "The resource sent is empty, You are advised to return",
    });
  }
  try {
    const results = await User.findOne({userid:userid});
    if (!results)
      return res.json({
        success: false,
        message: "Server error, Try agin later",
      });
    const isBlocked = results.block.includes(friendid)
    if (!isBlocked) {
      return res.json({
        success: false,
        message: "You never blocked this user.",
      });
    }
     await User.updateOne(
        {
          userid: userid,
        },
        {
          $pull: { block: friendid },
        })
          
            return res.json({
              success: true,
              message: "Successfully Unblocked the user",
              data: null,
            });
    
  } catch (error) {
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Internal server error, Unable to unblock user",
      error: "Internal server error, Unable to fetch Group",
    });
  }
}

module.exports = Unblock;
