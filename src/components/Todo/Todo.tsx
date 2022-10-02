import todo from "../../store/todo";
import { observer } from "mobx-react-lite";
import "./Todo.scss";
import { useState } from "react";
import { ITodoItem } from "../../types/todo";

export const Todo = observer(() => {
  const [title, setTitle] = useState("");

  const addTodo = () => {
    todo.addTodo({
      id: todo.todos[todo.todos.length - 1].id + 1,
      title: title,
      completed: false,
    });
    setTitle("");
  };

  return (
    <div className="todo">
      <h1 className="todo__header">To-do app</h1>
      <div className="todo__add-item">
        <label className="input">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="input__field"
            placeholder=" "
          />
          <span className="input__label">Add task</span>
        </label>
        <button onClick={() => addTodo()}>Add</button>
        <button className="clear" onClick={() => setTitle("")}>
          Clear
        </button>
      </div>
      <div className="todo__items">
        <h2>{todo.filter}</h2>
        {todo.items.map((todoItem: ITodoItem) => {
          return (
            <div key={todoItem.id} className="item">
              <label className="label">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={todoItem.completed}
                  onChange={() => todo.completedTodo(todoItem.id)}
                />
                {todoItem.title}
              </label>
              <button onClick={() => todo.removeTodo(todoItem.id)}>x</button>
            </div>
          );
        })}
      </div>
      <div className="todo__filter">
        <button
          className={todo.filter === "all" ? "btn_active" : ""}
          name="all"
          onClick={(e) => {
            let target = e.target as HTMLInputElement;
            todo.changeFilter(target.name)
          }}
        >
          All
        </button>
        <button
          className={todo.filter === "action" ? "btn_active" : ""}
          name="action"
          onClick={(e) => {
            let target = e.target as HTMLInputElement;
            todo.changeFilter(target.name)
          }}
        >
          In action
        </button>
        <button
          className={todo.filter === "done" ? "btn_active" : ""}
          name="done"
          onClick={(e:React.MouseEvent) => {
            let target = e.target as HTMLInputElement;
            todo.changeFilter(target.name)
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
});
