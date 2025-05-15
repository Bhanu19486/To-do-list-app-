import React, { useState, useEffect } from "react";
import Todolist from "./mycomponents/Todolist";

const App = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("myTodos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState("All");

  const changeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    const newTodo = { text: task, completed: false };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteHandler = (indexValue) => {
    const newTodos = todos.filter((_, index) => index !== indexValue);
    setTodos(newTodos);
  };

  const toggleCompletion = (indexValue) => {
    const updatedTodos = todos.map((todo, index) =>
      index === indexValue ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // 💾 Save todos to localStorage on change
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true;
  });

  return (
    <div>
      <center>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Todo Management Application</h5>
            <form onSubmit={submitHandler}>
              <input
                size="50"
                type="text"
                name="task"
                value={task}
                onChange={changeHandler}
              />
              &nbsp;&nbsp;
              <input type="submit" value="Add" name="Add" />
            </form>

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setFilter("All")}>All</button>&nbsp;
              <button onClick={() => setFilter("Completed")}>Completed</button>&nbsp;
              <button onClick={() => setFilter("Pending")}>Pending</button>
            </div>
            <br />
            <h2 className="card-title">Todo List</h2>
            <Todolist
              todolist={filteredTodos}
              deleteHandler={deleteHandler}
              toggleCompletion={toggleCompletion}
              originalTodos={todos}
            />
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;
