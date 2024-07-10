const mongoose = require('mongoose');
require("dotenv").config()
const url = process.env.DB_URL;
function ConnectDb () {

    mongoose.connect(url)
    .then(() => {
        console.log("Connected to mongo db")
    })
    .catch((error) => {
        console.log(error)
    })
};

module.exports = ConnectDb;
