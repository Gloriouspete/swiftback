const Group = require("../../model/group.js");

async function Blockuser(req, res) {
  const { userid } = req.user;
  const { groupid, sender } = req.body;
  
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
    const isBlocked = group.block.includes(sender);
    
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Only an admin can block a user from the group.",
      });
    }
    
    if (isBlocked) {
      return res.json({
        success: false,
        message: "This user is already blocked from the group.",
      });
    }
    
    await Group.updateOne(
      { _id: groupid },
      {
        $pull: { members: sender },
        $push: { block: sender },
      }
    );

    return res.json({
      success: true,
      message: "Successfully blocked the user.",
      data: null,
    });

  } catch (error) {
    console.error("Error blocking user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Unable to block user.",
      error: error.message,
    });
  }
}

module.exports = Blockuser;
