const Group = require("../../model/group.js");

async function Blockuser(req, res) {
  const { userid } = req.user;
  const { params, sender } = req.body;

  if (!params) {
    return res.json({
      success: false,
      message: "The resource sent is empty, You are advised to return",
    });
  }
  try {
    const results = await Group.findById(params);
    if (!results)
      return res.json({
        success: false,
        message: "Group Not found, Maybe it was deleted by admin",
      });
    const isAdmin = results.admin === userid;
    const isBlocked = results.block.includes(userid);
    const isMember = results.members.includes(userid);
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Only an admin can remove a user from a group",
      });
    }
    if (isBlocked) {
      return res.json({
        success: false,
        message: "You have already blocked this user from the group.",
      });
    }
    if (isMember) {
      Group.updateOne(
        {
          _id: params,
        },
        {
          $pull: { members: sender },
          $push: { block: sender },
        },
        (err, updatedGroup) => {
            if (err) {
              return res.json({
                success: false,
                message: "Error fetching ads",
                error: "Internal server error, Unable to fetch Group",
              });
            }
            return res.json({
              success: true,
              message: "Successfully Blocked the user",
              data: null,
            });
          }
      );
    }
    Group.findByIdAndUpdate(
      params,
      { $addToSet: { members: userid } },
      { new: true, useFindAndModify: false },
      (err, updatedGroup) => {
        if (err) {
          return res.json({
            success: false,
            message: "Error fetching ads",
            error: "Internal server error, Unable to fetch Group",
          });
        }
        return res.json({
          success: true,
          message: "Successfully Joined",
          data: null,
        });
      }
    );
  } catch (error) {
    console.error("Error finding user credentials:", error);
    return res.json({
      success: false,
      message: "Internal server error, Unable to fetch Group",
      error: "Internal server error, Unable to fetch Group",
    });
  }
}

module.exports = Blockuser;
