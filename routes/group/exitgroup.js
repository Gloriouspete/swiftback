const Group = require("../../model/group.js");

async function Exitgroup(req, res) {
  const { userid } = req.user;
  const { groupid } = req.body;

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

    const isMember = group.members.includes(userid);

    if (!isMember) {
      return res.json({
        success: false,
        message: "You are currently not in the group.",
      });
    }

    await Group.updateOne(
      { _id: groupid },
      {
        $pull: { members: userid },
      }
    );

    return res.json({
      success: true,
      message: "You've successfully exit the group.",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Unable to exit group.",
      error: error.message,
    });
  }
}

module.exports = Exitgroup;
