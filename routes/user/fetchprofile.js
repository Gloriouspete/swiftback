const User = require("../../model/user.js");
async function Fetchprofile(req, res) {
  const { username } = req.body;
  const { userid } = req.user;
  try {
    if (!username) {
      return res
        .status(402)
        .json({ success: false, message: "Username is required" });
    }
    const query = username.length > 10 ? { userid: username } : { username };
    const users = await User.findOne(query);
    if (!users) {
      return res
        .status(402)
        .json({ success: false, message: "User does not exist" });
    }
    const userId = users.userid;
    const results = await User.findOne({ userid });
    const isBlocked = results.block.includes(userId);
    return res.status(200).json({
      success: true,
      message: "Details returned successfully",
      data: users,
      blocked: isBlocked,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error,Try again later",
    });
  }
}
module.exports = Fetchprofile;
