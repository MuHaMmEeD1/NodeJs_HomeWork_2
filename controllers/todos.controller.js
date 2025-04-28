import { Todo } from "../models/todo.model.js";
import { getTokenContents } from "../utils/getTokenContents.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("author", "name surname email");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAllTodos = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { id, email } = getTokenContents(res, accessToken);

    if (!user) return;

    const todos = await Todo.find({ authorId: id }).populate(
      "author",
      "name surname email"
    );
    res.status(200).json({ success: true, todos });
  } catch (error) {
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
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
