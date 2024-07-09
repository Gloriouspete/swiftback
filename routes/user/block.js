const User = require("../../model/user.js");

async function Block(req, res) {
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
    if (isBlocked) {
      return res.json({
        success: false,
        message: "You have already blocked this user.",
      });
    }
      User.updateOne(
        {
          userid: userid,
        },
        {
          $push: { block: friendid },
        })
          
            return res.json({
              success: true,
              message: "Successfully Blocked the user",
              data: null,
            });
    
  } catch (error) {
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Internal server error, Unable to block user",
      error: "Internal server error, Unable to fetch Group",
    });
  }
}

module.exports = Block;
