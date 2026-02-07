import { useState, useEffect } from "react";
import { saveTodos } from "../utils/storage";

export default function TodoList({ date, todos, setTodos }) {
  const [task, setTask] = useState("");

  // 🔥 auto save when todos change
  useEffect(() => {
    saveTodos(date, todos);
  }, [todos, date]);

  function addTask() {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: task, done: false },
    ]);

    setTask("");
  }

  function toggle(id) {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="card">
      <h2>Today's Tasks ✅</h2>

      <div className="todo-input">
        <input
          placeholder="New task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {todos.map((t) => (
        <div key={t.id} className="todo-item">
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => toggle(t.id)}
          />
          <span className={t.done ? "done" : ""}>
            {t.text}
          </span>
          <button onClick={() => remove(t.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}
