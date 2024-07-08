const Group = require("../../model/group.js");
async function Searchgroup(req, res) {
  const { searchtext } = req.body;
  console.log(searchtext)
  try {
    const regex = new RegExp(searchtext, "i");
    const users = await Group.find({
      $or: [{ name: { $regex: regex } },{ description: { $regex: regex } }],
    });
    res.status(200).json({success:true,message:"Groups returned successfully",data:users})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error, Can't get groups" });
  }
}
module.exports = Searchgroup;