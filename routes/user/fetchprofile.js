const User = require("../../model/user.js");
async function Fetchprofile(req, res) {
  const { username } = req.body;
  try {
    const users = await User.findOne({username});
    if(!users){
       return res.status(402).json({success:false,message:"User does not exist"})
    }
    return res.status(200).json({success:true,message:"Details returned successfully",data:users})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error,Try again later" });
  }
}
module.exports = Fetchprofile;