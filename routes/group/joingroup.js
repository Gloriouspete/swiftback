const Group = require("../../model/group.js");

async function Joingroup(req, res) {
  const { userid } = req.user;
  const { params } = req.body;

  if (!params) {
    return res.json({
      success: false,
      message: "The resource sent is empty, You are advised to return",
    });
  }

  try {
    const results = await Group.findById(params);
    if (!results) {
      return res.json({
        success: false,
        message: "Group Not found, Maybe it was deleted by admin",
      });
    }

    const isBlocked = results.block.includes(userid);
    const isMember = results.members.includes(userid);

    if (isBlocked) {
      return res.json({
        success: false,
        message: "You have been blocked From this group by the admin",
      });
    }

    if (isMember) {
      return res.json({
        success: false,
        message: "You are already in the group",
      });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      params,
      { $addToSet: { members: userid } },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      success: true,
      message: "Successfully Joined",
      data: updatedGroup,
    });

  } catch (error) {
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Internal server error, Unable to fetch Group",
      error: error.message,
    });
  }
}

module.exports = Joingroup;