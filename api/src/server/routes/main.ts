import { Request, Response, Router } from "express";
import Task from "../models/Task";
import { TaskStatus } from "../models/enums/TaskStatus";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World with Typescript" });
});

router.get("/page", (req: Request, res: Response) => {
  res.json({ message: "Main Page" });
});

router.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the task" });
  }
});

router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().lean();
    res.status(200).json({ message: "Tasks returned successfully", tasks });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong while getting the tasks" });
  }
});

// update title and description
router.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found." });
      return;
    }
    res.status(200).json({ message: "Task was updated", updatedTask });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong while updating the task" });
  }
});

// update status
router.put("/tasks/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(TaskStatus).includes(status)) {
      res.status(400).json({ error: "Invalid status." });
      return;
    }

    const updatedStatus = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedStatus) {
      res.status(404).json({ error: "Task not found." });
      return;
    }

    res.status(200).json({ message: "Status was updated", updatedStatus });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong while updating the task's status" });
  }
});

export default router;
