const User = require("../../model/user.js");
async function Fetchprofile(req, res) {
  const { username } = req.body;
  try {
    if (!username) {
      return res
      .status(402)
      .json({ success: false, message: "Username is required" });
    }
    const query = username.length > 10 ? { userid: username } : { username };
    const users = await User.findOne(query);    
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