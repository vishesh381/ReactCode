// import { useState, useRef, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../ToDoList.css";

// export default function ToDoListRedux() {
//   const { todos, editIndex } = useSelector((state: any) => state);
//   const dispatch = useDispatch();

//   const [inputValue, setInputValue] = useState("");
//   const [editValue, setEditValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleAdd = () => {
//     if (inputValue.trim()) {
//       dispatch({ type: "ADD_TODO", payload: inputValue.trim() });
//       setInputValue("");
//       inputRef.current?.focus();
//     }
//   };

//   const handleSave = () => {
//     if (editValue.trim()) {
//       dispatch({ type: "SAVE_EDIT", payload: editValue.trim() });
//       setEditValue("");
//     }
//   };

//   const pendingItems = useMemo(() => todos.filter((t: any) => !t.completed), [todos]);
//   const completedItems = useMemo(() => todos.filter((t: any) => t.completed), [todos]);

//   return (
//     <div className="container">
//       <div className="box">
//         <h1>To Do List</h1>

//         <div className="input-section">
//           <input
//             ref={inputRef}
//             type="text"
//             value={inputValue}
//             placeholder="Add your task"
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//           <button className="add-btn" onClick={handleAdd}>ADD</button>
//         </div>

//         <div className="status">
//           <p>🕓 Pending: {pendingItems.length}</p>
//           <p>✅ Completed: {completedItems.length}</p>
//         </div>

//         <h3>🕓 Pending Tasks</h3>
//         <ul>
//           {pendingItems.map((item: any, index: number) => {
//             const realIndex = todos.indexOf(item);
//             return (
//               <li key={realIndex}>
//                 {editIndex === realIndex ? (
//                   <>
//                     <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
//                     <button onClick={handleSave}>Save</button>
//                     <button onClick={() => dispatch({ type: "CANCEL_EDIT" })}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     {item.text}
//                     <button onClick={() => {
//                     dispatch({ type: "START_EDIT", index: realIndex });
//                     setEditValue(todos[realIndex].text.replace(/^Added at \d{4}-\d{2}-\d{2}:\s*/, ""));
//                     }}>Edit</button>
//                     <button onClick={() => dispatch({ type: "MARK_COMPLETE", index: realIndex })}>Complete</button>
//                     <button onClick={() => dispatch({ type: "DELETE_TODO", index: realIndex })}>Delete</button>
//                   </>
//                 )}
//               </li>
//             );
//           })}
//         </ul>

//         <h3>✅ Completed Tasks</h3>
//         <ul>
//           {completedItems.map((item: any, index: number) => {
//             const realIndex = todos.indexOf(item);
//             return (
//               <li key={realIndex} className="completed">
//                 {item.text}
//                 <button onClick={() => dispatch({ type: "MARK_PENDING", index: realIndex })}>Undo</button>
//                 <button onClick={() => dispatch({ type: "DELETE_TODO", index: realIndex })}>Delete</button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  startEdit,
  saveEdit,
  cancelEdit,
  markComplete,
  markPending,
  deleteTodo,
  fetchTodos,
} from "../slice/todoSlice";
import "../ToDoList.css";

export default function ToDoListRedux() {
  const { todos, editIndex, loading, error } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch initial todos
  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, [dispatch]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleSave = () => {
    if (editValue.trim()) {
      dispatch(saveEdit(editValue.trim()));
      setEditValue("");
    }
  };

  const pendingItems = useMemo(() => todos.filter((t: any) => !t.completed), [todos]);
  const completedItems = useMemo(() => todos.filter((t: any) => t.completed), [todos]);

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
          {pendingItems.map((item: any, index: number) => {
            const realIndex = todos.indexOf(item);
            return (
              <li key={realIndex}>
                {editIndex === realIndex ? (
                  <>
                    <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => dispatch(cancelEdit())}>Cancel</button>
                  </>
                ) : (
                  <>
                    {item.text}
                    <button onClick={() => {
                      dispatch(startEdit(realIndex));
                      setEditValue(todos[realIndex].text.replace(/^Added at \d{4}-\d{2}-\d{2}:\s*/, ""));
                    }}>Edit</button>
                    <button onClick={() => dispatch(markComplete(realIndex))}>Complete</button>
                    <button onClick={() => dispatch(deleteTodo(realIndex))}>Delete</button>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        <h3>✅ Completed Tasks</h3>
        <ul>
          {completedItems.map((item: any) => {
            const realIndex = todos.indexOf(item);
            return (
              <li key={realIndex} className="completed">
                {item.text}
                <button onClick={() => dispatch(markPending(realIndex))}>Undo</button>
                <button onClick={() => dispatch(deleteTodo(realIndex))}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
