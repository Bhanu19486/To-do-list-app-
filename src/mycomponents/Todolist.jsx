import React from "react";

const Todolist = ({ todolist, deleteHandler, toggleCompletion, originalTodos }) => {
  return (
    <div>
      {todolist.length === 0 ? (
        <h5 className="no-tasks">No tasks to show</h5>
      ) : (
        todolist.map((todo) => {
          const index = originalTodos.indexOf(todo);
          return (
            <div key={index} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(index)}
              />
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
              <button className="btn delete-btn" onClick={() => deleteHandler(index)}>Delete</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Todolist;
