const mongoose = require("mongoose");
const db_string_query = `mongodb://${process.env.MLAB_USERNAME}:${
  process.env.MLAB_PASSWORD
}@ds161092.mlab.com:61092/getdev`;

mongoose.set("useCreateIndex", true);
mongoose.connect(
  db_string_query,
  {
    useNewUrlParser: true,
    keepAlive: 300000,
    connectTimeoutMS: 30000
  }
);
let db = mongoose.connection;
module.exports = db;
