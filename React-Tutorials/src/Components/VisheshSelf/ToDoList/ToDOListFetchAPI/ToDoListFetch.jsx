import React, { useEffect, useState } from "react";
import "./Styles.css";
const ToDoListFetch = () => {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const fetchTodos = async () => {
    try {
      const todoData = await fetch("https://dummyjson.com/todos");
      const todoDataJson = await todoData.json();
      console.log("todoDataJson+++", todoDataJson.todos);
      setTodos(todoDataJson.todos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const handleDelete = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    console.log("updatedTodos+++", updatedTodos);
    setTodos(updatedTodos);
    console.log("todosDelete++", todos);
  };
  const handleEditIndex = (indexToEdit) => {
    setEditIndex(indexToEdit);
    setEditValue(todos[indexToEdit].todo);
  };
  const handleChange = (e)=>{
    setEditValue(e.target.value)
  }
  const handleCancel=()=>{
    setEditIndex(null)
    setEditValue("");
  }
  const handleSave = (saveIndex)=>{
    if (editValue.trim() === "") return;
    const updatedList = [...todos];
    if (editIndex !== null) {
      updatedList[editIndex].todo = editValue;
      setTodos(updatedList);
      console.log("todos++++",todos)
      setEditIndex(null);
      setEditValue("");
    }
  }
  return (
    <div className="container">
      {todos.map((todo, index) => (
        <div className="box" key={index}>
          {index !== editIndex ? (
          Object.entries(todo).map(([key, value]) =>
            key === "todo" ? (
              <p key={key}>
                {key}: {value}{" "}
                <button
                  onClick={() => {
                    handleEditIndex(index);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>
              </p>
            ) : null
          )
          ):(
          <div>
            <input className="input-section"
              type="text"
              value={editValue}
              onChange={(e) => handleChange(e)}
            />
            <button onClick={() => handleSave(index)}>Save</button>
            <button onClick={() => handleCancel()}>Cancel</button>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoListFetch;
