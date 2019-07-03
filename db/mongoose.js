const mongoose = require("mongoose");

const DatabaseName = "2gethr-assignment"
const DatabaseURL = "mongodb://127.0.0.1:27017/"

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected to mongodb");
});
mongoose.connect(DatabaseURL + DatabaseName, { useNewUrlParser: true, useCreateIndex: true })