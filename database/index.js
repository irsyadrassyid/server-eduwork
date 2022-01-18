const mongoose = require("mongoose");
// const { dbHost, dbPort, dbPass, dbUser, dbName } = require("../app/config");

// mongoose.connect(
//   `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
// );
mongoose
  .connect(
    `mongodb+srv://irsyadrassyid:Keren123*@cluster0.zkuys.mongodb.net/eduwork-store?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("database terhubung ");
  });
const db = mongoose.connection;

module.exports = db;
