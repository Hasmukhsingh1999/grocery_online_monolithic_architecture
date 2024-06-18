const { DB_URL } = require("../config");
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      autoIndex: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
