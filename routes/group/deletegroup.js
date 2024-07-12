const Group = require("../../model/group.js");

async function Deletegroup(req, res) {
  const { userid } = req.user;
  const { groupid} = req.body;
  
  if (!groupid) {
    return res.json({
      success: false,
      message: "The resource sent is empty. Please provide a valid group ID.",
    });
  }
  
  try {
    const group = await Group.findById(groupid);
    
    if (!group) {
      return res.json({
        success: false,
        message: "Group not found. It may have been deleted by an admin.",
      });
    }
    
    const isAdmin = group.admin === userid;
   
    
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Only an admin can delete a group.",
      });
    }
    
    await Group.deleteOne(
      { _id: groupid });

    return res.json({
      success: true,
      message: "Successfully deleted the group.",
      data: null,
    });

  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Unable to delete group.",
      error: error.message,
    });
  }
}

module.exports = Deletegroup;
