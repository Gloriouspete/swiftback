const express = require('express');
const ConnectDb = require("./config/db.js")
const bodyParser = require('body-parser');
const http = require("http")
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, X-Auth-Token"
    );
    next();
  });
  app.options(
    "*",
    cors({
      optionsSuccessStatus: 200,
    })
  );
const authenticateJWT = require("./middleware/auth.js")
app.use(authenticateJWT)
const Chat = require("./routes/sockets/chat.js")
const Register = require("./routes/auth/register.js")
const Login = require("./routes/auth/login.js")
const Search = require("./routes/user/searchuser.js")
const Fetchprofile = require("./routes/user/fetchprofile.js")
const Getuser = require("./routes/user/getuser.js");
const Createmessage = require('./routes/messages/createmsg.js');
const Retrievechats = require('./routes/messages/retrievechats.js');
const Getmessages = require('./routes/messages/getmessages.js');
const Deletemsg  = require('./routes/messages/deletemsg.js');
const Creategroup = require('./routes/group/creategroup.js');
const Retrievegroups = require('./routes/group/retrievegroups.js');
const Searchgroup = require('./routes/group/searchGroup.js');
const Getgroup = require('./routes/group/getgroup.js');
const Joingroup = require('./routes/group/joingroup.js');
const Fetchgroupmsg = require('./routes/group/fetchmessages.js');
const Blockuser = require('./routes/group/block.js');

io.on("connection", (socket) => {
  Chat(socket,io)
});

app.post("/api/v1/register",Register)
app.post("/api/v1/login",Login)
app.post("/api/v1/fetchprofile",Fetchprofile)
app.post("/api/v1/searchuser",Search)
app.get("/api/v1/getuser",Getuser)
app.post("/api/v1/createmsg",Createmessage)
app.get("/api/v1/retrievechats",Retrievechats)
app.get("/api/v1/retrievegroups",Retrievegroups)
app.post("/api/v1/getmessages",Getmessages)
app.post("/api/v1/deletemsg",Deletemsg)
app.post("/api/v1/creategroup",Creategroup)
app.post("/api/v1/searchgroups",Searchgroup)
app.post("/api/v1/getgroups",Getgroup)
app.post("/api/v1/fetchgroupmsg",Fetchgroupmsg)
app.post("/api/v1/joingroup",Joingroup)
app.post("/api/v1/blockuser",Blockuser)
ConnectDb();
server.listen(PORT, () =>{
    console.log("Server is started on" + PORT)
})