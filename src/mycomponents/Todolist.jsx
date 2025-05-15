import React from "react";

const Todolist = ({ todolist, deleteHandler, toggleCompletion, originalTodos }) => {
  return (
    <div>
      {todolist.length === 0 ? (
        <h5>No tasks to show</h5>
      ) : (
        todolist.map((todo) => {
          const index = originalTodos.indexOf(todo); // needed since filtered list might alter indexes
          return (
            <div key={index}>
              <h5>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(index)}
                />
                &nbsp;
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
                &nbsp;&nbsp;
                &nbsp;&nbsp;

                <button onClick={() => deleteHandler(index)}>Delete</button>
              </h5>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Todolist;
