import React, { useState, useEffect } from "react";
import Todolist from "./mycomponents/Todolist";
import './App.css'; // Include this CSS file

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("myTodos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState("All");

  const changeHandler = (e) => setTask(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const deleteHandler = (indexValue) => {
    setTodos(todos.filter((_, index) => index !== indexValue));
  };

  const toggleCompletion = (indexValue) => {
    setTodos(
      todos.map((todo, index) =>
        index === indexValue ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="card glass-card">
        <h2 className="title">🌟 Todo Management Application 🌟</h2>
        <form onSubmit={submitHandler}>
          <input
            className="task-input"
            type="text"
            value={task}
            onChange={changeHandler}
            placeholder="Enter a task..."
          />
          <button className="btn" type="submit">Add</button>
        </form>

        <div className="filter-buttons">
          <button className="btn" onClick={() => setFilter("All")}>All</button>
          <button className="btn" onClick={() => setFilter("Completed")}>Completed</button>
          <button className="btn" onClick={() => setFilter("Pending")}>Pending</button>
        </div>

        <Todolist
          todolist={filteredTodos}
          deleteHandler={deleteHandler}
          toggleCompletion={toggleCompletion}
          originalTodos={todos}
        />
      </div>
    </div>
  );
};

export default App;
