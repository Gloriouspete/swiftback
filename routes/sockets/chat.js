const getRoom = require("../../services/getroom.js");
const Addmessage = require("../../services/message.js");
const Updateread = require("../../services/updateread.js");
const AddForum = require("../../services/forum.js");
let users = {};
function Chat(socket, io) {
  console.log("a user connected");
  socket.on("user-id", (userId) => {
    console.log("i don receive userid o ", userId);
    socket.join(userId);
  });


socket.on("start-conversation", ({ chatid, userid }) => {
  console.log("User wants to start a conversation with:", userid);
  users[socket.id] = { userid, chatid };
  socket.join(chatid);

  const onlineUsers = Object.values(users).filter(user => user.chatid === chatid);

  onlineUsers.forEach(user => {
    console.log(user.userid, "is online");
    io.to(chatid).emit("useronline", { userid: user.userid, online: true });
  });
});


  socket.on("join-group", (data) => {
    console.log("User wants to start a conversation with:", data);
    socket.join(data);
  });

  socket.on("message", (data) => {
    console.log("Message received:", data);
    Addmessage(data);
    const room = data.chatid;
    console.log(room);
    socket.join(room);
    io.to(room).emit("message", data);
  });

  socket.on("readreceipt", (data) => {
    const room = data.roomid;
    socket.join(room);
    Updateread(room, data.sender);
    io.to(room).emit("readreceipt", data.sender);
  });

  socket.on("groupmessage", (data) => {
    console.log("Message received:", data);
    AddForum(data);
    const room = data.groupid;
    console.log(room);
    socket.join(room);
    io.to(room).emit("groupmessage", data);
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const { chatid, userid } = user;
      delete users[socket.id];
      console.log("A user disconnected");

      io.to(chatid).emit("useronline", { userid, online: false });
    }
  });
}

module.exports = Chat;
