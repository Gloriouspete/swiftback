const User = require("../../model/user.js");
async function Getuser(req, res) {
  const { userid } = req.user;
  try {
    const users = await User.findOne({userid});
    if(!users){
        return res.status(402).json({success:false,message:"User does not exist"})
    }
   // const newuser = users.filter((items))
    console.log(users)
    res.status(200).json({success:true,message:"Details returned successfully",data:users})
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error,Try again later" });
  }
}
module.exports = Getuser;