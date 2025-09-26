import { useState } from "react";
import "../App.css";

export function ToDoList() {
  const [inputValue, setInputValue] = useState<string>("");
  const [listItems, setListItems] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setListItems([...listItems, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (indexToDelete: number) => {
    const updatedList = listItems.filter((_, index) => index !== indexToDelete);
    setListItems(updatedList);
    if (editIndex === indexToDelete) {
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditValue(listItems[index]);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSaveClick = () => {
    if (editValue.trim() === "") return;
    const updatedList = [...listItems];
    if (editIndex !== null) {
      updatedList[editIndex] = editValue;
      setListItems(updatedList);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="container">
      <div className="box">
        <h1>----- To DO List Component here -----</h1>
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            placeholder="Add your task"
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAdd}>
            ADD
          </button>
        </div>
        <div className="todo-items">
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    {item}
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
