const User = require("../model/user.js");
async function getProfile(userid) {
  try {
    const response = await User.findOne({ userid });
    console.log("see response", response);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = getProfile;
