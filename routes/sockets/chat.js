const getRoom = require( "../../services/getroom.js");
const Addmessage = require( "../../services/message.js");
//const Updateread = require( "../../services/updateread.js");
const AddForum = require( "../../services/forum.js");
function Chat(socket, io) {
  console.log("a user connected");

  console.log("A user connected");
  socket.on("user-id", (userId) => {
    console.log("i don receive userid o ", userId);
    socket.join(userId);
  });

  socket.on("start-conversation", (data) => {
    console.log("User wants to start a conversation with:",data);
    socket.join(data);
  });

  socket.on("join-group", (data) => {
    console.log("User wants to start a conversation with:",data);
    socket.join(data);
  });
  socket.on("typing", (data) => {
    console.log("Message received:", data);
    const { id, sender } = data;
    const room = getRoom(id, sender);
    socket.join(room);
    io.to(room).emit("typing", data);
  });
  socket.on("blur", (data) => {
    console.log("Message received:", data);
    const { id, sender } = data;
    const room = getRoom(id, sender);
    socket.join(room);
    io.to(room).emit("blur", data);
  });

  socket.on("message", (data) => {
    console.log("Message received:", data);
    Addmessage(data);
    const room = data.chatid;
    console.log(room);
    socket.join(room);
    io.to(room).emit("message", data);
  });
/*
  socket.on("readreceipt", (data) => {
    console.log("receipt received", data);
    const room = data.roomid;
    socket.join(room)
    Updateread(room, data.sender);
    io.to(room).emit("readreceipt",data.sender)
  });
*/
  socket.on("groupmessage", (data) => {
    console.log("Message received:", data);
    AddForum(data);
    const room = data.groupid;
    console.log(room);
    socket.join(room);
    io.to(room).emit("groupmessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
};

module.exports = Chat;