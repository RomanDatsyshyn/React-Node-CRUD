require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");

const {
  errorHandler,
  unknownEndpoint,
} = require("./middlewares/requestMiddleware");

const app = express();
const db = require("./database");

db.connection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.appRoot = __dirname;

const { goodsRouter } = require("./routes");

app.use("/goods", goodsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const server = http.createServer(app);

server.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening on port ${process.env.PORT}...`);
});
