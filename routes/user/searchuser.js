const User = require("../../model/user.js");
async function Search(req, res) {
  const { searchtext } = req.body;
  console.log(searchtext)
  try {
    const regex = new RegExp(searchtext, "i");
    const users = await User.find({
      $or: [{ username: { $regex: regex } },{ displayname: { $regex: regex } }],
    });
    res.status(200).json({success:true,message:"Details returned successfully",data:users})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
module.exports = Search;