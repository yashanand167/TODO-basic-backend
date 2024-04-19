import { Task } from '../models/tasks.model.js';

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    if (!task) {
      res.status(401).json({ error: ' Try Again ' });
    }
    return res.status(200).json({ message: ' Task created successfully ', task });
  } catch (error) {
    console.error(' Error creating task ');
    res.status(500).json(error);
  }
};

export const updateTaskHandler = asyncHandler(async (req, res) => {
  const taskId = req.params._id;
  console.log(taskId);
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description is required");
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  if (!task) {
    throw new ApiError(400, "Something went wrong while updating the task");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, task, "Task updated successfully"));
});

export const searchforTask = async (req, res) => {
  try {
    const {title,description} = req.body;
    const task = await Task.findOne({ title,description });
    if (!task) {
      res.status(404).json({ error: ' Not Found ' });
    }
    res.status(200).json({ message: ' Task Found ',task });
  } catch (error) {
    res.status(500).json({ error: ' Internal Server Error ' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params._id;
    const task = await Task.findByIdAndDelete(taskId);

    if (task) {
      res.status(404).json({ error: ' Task not deleted. ' });
    }

    res.status(200).json({ message: ' Task deleted successfully. ' });
  } catch (error) {
    res.status(500).json({ error: ' Internal server error. ' });
  }
};
