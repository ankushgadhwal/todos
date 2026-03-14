var express = require("express");
var router = express.Router();
const Task = require("../models/task");

/* GET home page. */
router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const tasks = await Task.findByPk(id);
//   res.json(tasks);
// });



router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  console.log(task);
  res.json(task);
  // res.send("Task created successfully");
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  await Task.update(req.body, { where: { id: id } });
  res.send("Task updated successfully");
});

router.delete("/", async (req, res) => {
  // res.render('index', { title: 'Express' });
  res.send("Task deleted successfully");
});

module.exports = router;
