import executor from "../config/db.js";

export const Addviews = async (params) => {
  try {
    const query = `UPDATE adverts SET views = views + 1 where advertid = ?`;
    executor(query, [params]);
  } catch (error) {
    console.log(error);
  }
};
