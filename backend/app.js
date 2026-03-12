const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');

const todoRouter = require("./routes/todo");
const usersRouter = require("./routes/users");

const app = express();
app.use(cors());
const port = 3000;
const sequelize = require("./config/database");
const mysql = require("mysql2");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/todo", todoRouter);
app.use("/api/users", usersRouter);


sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

sequelize.sync().then(() => {
  console.log("Tables created");
}); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
