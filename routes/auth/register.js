const User = require("../../model/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateUniqueUserID = require("../../services/uuid.js");
const secretKey = process.env.SECRET;
async function Register(req, res) {
  console.log("got here")
  const { displayname, username, password, email } = req.body;
  try {
    const [userResults, emailResults] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);
    //const phoneCount = phoneResults[0].phoneCount;
    //const emailCount = emailResults[0].emailCount;

    if (userResults) {
      console.log("The Username already exists");
      return res.status(402).json({
        success: false,
        message: "This Username already exists on our system",
      });
    }

    if (emailResults) {
      console.log("The email already exists");
      return res
        .status(402)
        .json({ success: false, message: "The Email Already Exists" });
    }

    const userid = generateUniqueUserID();
    const token = jwt.sign({ userid }, secretKey);
    const hashedpassword = jwt.sign({ password }, secretKey);
    const user = new User({
      userid,
      displayname,
      username,
      password:hashedpassword,
      email,
    });
    console.log(user);
    await user.save();
    console.log("Inserted user into the database successfully");

    return res
      .status(201)
      .json({ success: true, message: "successful", token: token ,userid:userid});
  } catch (error) {
    console.error("Error during user signup:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during user signup" });
  }
}

module.exports = Register;
