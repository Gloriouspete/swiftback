const Group = require("../../model/group.js");

async function Getgroup(req, res) {
  const { userid } = req.user;
  const { params } = req.body;

  if(!params){
    return res.json({ success: false, message: "The resource sent is empty, You are advised to return" });
  }
  try{
    const results = await Group.findById(params);
    if(!results) return res.json({ success: false, message: "Group Not found, Maybe it was deleted by admin" });
    const isBlocked = results.block.includes(userid)
    const isMember = results.members.includes(userid)
    if(isBlocked){
        return res.json({ success: false, message: "You have been blocked From this group by the admin" });
    }
    if(!isMember){
        return res.json({ success: false, message: "You can't view this group as you haven't joined yet" });
    }
    console.log(results,"kiopp")
    return res.json({
      success: true,
      message: "Successfully returned",
      data: results,
    });
   
  }
  catch(error){
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Error fetching ads",
      error: "Internal server error, Unable to fetch Group",
    });
  }
}
module.exports = Getgroup;