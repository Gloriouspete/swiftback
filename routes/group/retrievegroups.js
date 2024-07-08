const Group = require("../../model/group.js");

async function Retrievegroups(req, res) {
  const { userid } = req.user;

  try {
    const groups = await getGroups(userid)
    console.log(groups,"looooool");
    res.status(200).json({
      success: true,
      message: "Details returned successfully",
      data: groups,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

const getGroups = async (userid) => {
  try {
    const groups = await Group.find({
     members:userid
    }).populate('members');
    return groups
  } catch (error) {
    console.log(error);
  }
};
module.exports = Retrievegroups;
/**
 * 
 *  {
        $group: {
            chatid:'$chatid',
            
        },
      },

      const chats = await Chat.find({
      $or: [{ firstid: userid }, { secondid: userid }],
    });
 */