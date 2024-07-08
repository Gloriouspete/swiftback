const Group = require("../../model/group.js");
const getProfile = require("../../services/getProfile.js");

async function Creategroup(req, res) {
  const { userid } = req.user;
  const { groupname, description,image } = req.body;
  try {
    const response = await getProfile(userid);
    const { displayname, username } = response;
    const newGroup = new Group({
      name:groupname,
      admin: userid,
      adminname: displayname,
      description,
      image,
      members: [userid],
    });
    console.log(newGroup);
    await newGroup.save()
    return res.status(200).json({
      success: true,
      message: "Group is successfully Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "There is an issue with creating this group. Kindly try again later.",
    });
  }
}

module.exports = Creategroup;
