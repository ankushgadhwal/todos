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
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      completed === undefined
    ) {
      return res.status(400).json({ message: "Nothing to update" });
    }
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: `Task with id ${id} not found` });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask, // ✅ Angular signal uses this
    });
  } catch (error) {
    console.error("Update task error:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  // res.render('index', { title: 'Express' });
  res.send("Task deleted successfully");
});

module.exports = router;
