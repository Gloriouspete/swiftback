const mongoose = require('mongoose');

function ConnectDb () {

    mongoose.connect("mongodb://localhost:27017/swiftdb",{
        useNewUrlParser: true,
    
    })
    .then(() => {
        console.log("Connected to mongo db")
    })
    .catch((error) => {
        console.log(error)
    })
};

module.exports = ConnectDb;
