import generateLogMessage from "../utils/genareteLogMessage.js";
import { Todo } from "../models/todo.model.js";
import { getTokenContents } from "../utils/getTokenContents.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("author", "name surname email");
    generateLogMessage(
      "All todos fetched successfully",
      "200",
      req.originalUrl,
      "INFO"
    );
    res.status(200).json(todos);
  } catch (error) {
    generateLogMessage(
      `Error fetching todos: ${error.message}`,
      "500",
      req.originalUrl,
      "ERROR"
    );
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      generateLogMessage(
        `Todo not found with ID: ${req.params.id}`,
        "404",
        req.originalUrl,
        "WARN"
      );
      return res.status(404).json({ message: "Todo not found" });
    }
    generateLogMessage(
      `Todo fetched successfully with ID: ${req.params.id}`,
      "200",
      req.originalUrl,
      "INFO"
    );
    res.status(200).json(todo);
  } catch (error) {
    generateLogMessage(
      `Error fetching todo by ID: ${error.message}`,
      "500",
      req.originalUrl,
      "ERROR"
    );
    res.status(500).json({ message: error.message });
  }
};

export const getMyAllTodos = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { id, email } = getTokenContents(res, accessToken);

    if (!id) {
      generateLogMessage(
        "Unauthorized attempt to fetch todos",
        "401",
        req.originalUrl,
        "WARN"
      );
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const todos = await Todo.find({ author: id }).populate(
      "author",
      "name surname email"
    );
    generateLogMessage(
      `All todos fetched for user ${email}`,
      "200",
      req.originalUrl,
      "INFO"
    );
    res.status(200).json({ success: true, todos });
  } catch (error) {
    generateLogMessage(
      `Error fetching user todos: ${error.message}`,
      "500",
      req.originalUrl,
      "ERROR"
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const { accessToken } = req.cookies;
  const { id, email } = getTokenContents(res, accessToken);

  const { title, description } = req.body;
  const todo = new Todo({
    title,
    description,
    author: id,
  });
  try {
    const savedTodo = await todo.save();
    generateLogMessage(
      `Todo created successfully by user ${email}`,
      "201",
      req.originalUrl,
      "INFO"
    );
    res.status(201).json(savedTodo);
  } catch (error) {
    generateLogMessage(
      `Error creating todo: ${error.message}`,
      "400",
      req.originalUrl,
      "ERROR"
    );
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      generateLogMessage(
        `Todo not found for update with ID: ${req.params.id}`,
        "404",
        req.originalUrl,
        "WARN"
      );
      return res.status(404).json({ message: "Todo not found" });
    }
    generateLogMessage(
      `Todo updated successfully with ID: ${req.params.id}`,
      "200",
      req.originalUrl,
      "INFO"
    );
    res.status(200).json(todo);
  } catch (error) {
    generateLogMessage(
      `Error updating todo: ${error.message}`,
      "400",
      req.originalUrl,
      "ERROR"
    );
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      generateLogMessage(
        `Todo not found for deletion with ID: ${req.params.id}`,
        "404",
        req.originalUrl,
        "WARN"
      );
      return res.status(404).json({ message: "Todo not found" });
    }
    generateLogMessage(
      `Todo deleted successfully with ID: ${req.params.id}`,
      "200",
      req.originalUrl,
      "INFO"
    );
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    generateLogMessage(
      `Error deleting todo: ${error.message}`,
      "500",
      req.originalUrl,
      "ERROR"
    );
    res.status(500).json({ message: error.message });
  }
};
