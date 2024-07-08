import executor from "../config/db.js";
import generateUniqueUserID from "./uuid.js";
export default async function CreateToken(userid) {
  const token = generateUniqueUserID();
  try {
    const query = `INSERT INTO emailtoken (userid,token) VALUES (?,?)`;
    await executor(query, [userid, token]);
    return token
  } catch (error) {
    throw error;
  }
}
