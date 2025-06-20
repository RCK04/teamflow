import { Request, Response, Router } from 'express';
import Task from '../models/Task';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello World with Typescript" });
})

router.get('/page', (req: Request, res: Response) => {
    res.json({ message: "Main Page" });
})

router.post('/tasks', async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Something went wrong while creating the task" });
    }
})

router.get('/tasks', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().lean();
        res.status(200).json({ message: "Tasks returned successfully", tasks });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong while getting the tasks" });
    }
})

router.put('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.status(200).json({ message: "Task was updated", updatedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong while updating the task" })
    }
})

export default router;