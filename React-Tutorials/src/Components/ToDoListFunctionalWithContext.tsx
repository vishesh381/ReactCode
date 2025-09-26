import { useState, useRef, useMemo } from "react";
import { useTodoContext } from "../context/TodoContext";
import "../ToDoList.css";

export default function ToDoListFunctionalWithContext() {
  const { state, dispatch } = useTodoContext();
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", payload: inputValue.trim() });
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleSave = () => {
    if (editValue.trim()) {
      dispatch({ type: "SAVE_EDIT", payload: editValue.trim() });
      setEditValue("");
    }
  };

  const pendingItems = useMemo(() => state.todos.filter((t) => !t.completed), [state.todos]);
  const completedItems = useMemo(() => state.todos.filter((t) => t.completed), [state.todos]);

  return (
    <div className="container">
      <div className="box">
        <h1>To Do List</h1>

        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder="Add your task"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="add-btn" onClick={handleAdd}>ADD</button>
        </div>

        <div className="status">
          <p>🕓 Pending: {pendingItems.length}</p>
          <p>✅ Completed: {completedItems.length}</p>
        </div>

        <h3>🕓 Pending Tasks</h3>
        <ul>
          {pendingItems.map((item, index) => {
            const realIndex = state.todos.indexOf(item);
            return (
              <li key={realIndex}>
                {state.editIndex === realIndex ? (
                  <>
                    <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => dispatch({ type: "CANCEL_EDIT" })}>Cancel</button>
                  </>
                ) : (
                  <>
                    {item.text}
                    <button onClick={() => {
                      dispatch({ type: "START_EDIT", index: realIndex });
                      setEditValue(item.text);
                    }}>Edit</button>
                    <button onClick={() => dispatch({ type: "MARK_COMPLETE", index: realIndex })}>Complete</button>
                    <button onClick={() => dispatch({ type: "DELETE_TODO", index: realIndex })}>Delete</button>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        <h3>✅ Completed Tasks</h3>
        <ul>
          {completedItems.map((item, index) => {
            const realIndex = state.todos.indexOf(item);
            return (
              <li key={realIndex} className="completed">
                {item.text}
                <button onClick={() => dispatch({ type: "MARK_PENDING", index: realIndex })}>Undo</button>
                <button onClick={() => dispatch({ type: "DELETE_TODO", index: realIndex })}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
