const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connected at ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectdb;
