import executor from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateUniqueUserID from "./uuid.js";
dotenv.config();
const secretKey = process.env.SECRET;

export default async function Googlesign(data) {
  const { given_name, family_name, email, picture } = data;

  try {
    const emailQuery = "SELECT userid,password FROM users WHERE email = ?";
    const emailResults = await executor(emailQuery, [email.toString()]);
    console.log(emailResults, "too real");
    if (emailResults && emailResults[0]) {
      const { userid } = emailResults[0];
      const token = jwt.sign({ userid }, secretKey);

      const load = {
        success: true,
        message: "Successfully Logged in",
        type: "login",
        token: token,
        userid: userid,
      };
      return load;
    }

    const userid = generateUniqueUserID();
    const token = jwt.sign({ userid }, secretKey);

    const insertUserQuery =
      "INSERT INTO users (firstname, lastname, password, email, userid, imageurl) VALUES (?, ?, ?, ?, ?, ?)";

    await executor(insertUserQuery, [
      given_name,
      family_name,
      `usedgoogle${family_name}`,
      email,
      userid,
      picture,
    ]);
    console.log("Inserted user into the database successfully");
    const load = {
      success: true,
      message: "successful",
      type: "register",
      token: token,
      userid: userid,
    };
    return load;
  } catch (error) {
    console.error("Error during user signup:", error);
    throw error;
  }
}
