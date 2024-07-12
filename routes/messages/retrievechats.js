const Chat = require("../../model/chat.js");

async function Retrievechats(req, res) {
  const { userid } = req.user;

  try {
    const chats = await getChats(userid)
    res.status(200).json({
      success: true,
      message: "Details returned successfully",
      data: chats,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

const getChats = async (userid) => {
  try {
    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [{ firstid: userid }, { secondid: userid }],
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "chatid",
          foreignField: "chatid",
          as: "messages",
        },
      },
      {
        $unwind: {
          path: "$messages",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
            'messages.date':-1
        },
      },
      {
        $group:{
            _id:"$chatid",
            firstname:{$first:'$firstname'},
            secondname:{$first:'$secondname'},
            msg:{$first:'$messages'},
            firstid:{$first:'$firstid'},
            secondid:{$first:'$secondid'},
            deleted:{
              $first:'$deleted'
            }
        }
      },
      {
        $match: {
          deleted: { $nin: [userid] },
          msg: { $ne: null } 
        },
      }
    ]);
    return chats
  } catch (error) {
    console.log(error);
  }
};
module.exports = Retrievechats;
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