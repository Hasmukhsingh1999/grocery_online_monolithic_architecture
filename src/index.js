const express = require("express");
const { PORT } = require("./config");
const expressApp = require("./express-app");
const { databaseConnections } = require("./database");

const StartServer = async () => {
  const app = express();

  await databaseConnections()
  await expressApp(app);
  app
    .listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
};
StartServer()