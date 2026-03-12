var express = require("express");
var router = express.Router();
const Task = require("../models/task");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post("/", async (req, res, next) => {
  const task = await Task.create(req.body);
  console.log(task);  
  res.json(task);
  // res.send("Task created successfully");
});

router.put("/", async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.send("Task updated successfully");
});

router.delete("/", async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.send("Task deleted successfully");
});

module.exports = router;
