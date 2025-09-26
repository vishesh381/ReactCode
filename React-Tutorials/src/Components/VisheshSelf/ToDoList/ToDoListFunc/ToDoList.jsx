import { useState } from "react";

export default function ToDoList(){
    const [inputValue,setInputValue] = useState("");
    const [listItems,setListItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue,setEditValue] = useState("");
    const handleChange= (e)=>{
        setInputValue(e.target.value);
        console.log("value+++",inputValue);
    }
    const handleAdd= ()=>{
        setListItems([...listItems,inputValue]);
        setInputValue("");
    }
    const handleDelete =(indexToDelete)=>{
        const newArr = listItems.filter((_,index)=>(index!==indexToDelete));
        console.log("newArr",newArr);
        setListItems(newArr);
        if(indexToDelete===editIndex){
            setEditIndex(null);
            setEditValue("");
        }
    }
    const handleEditChange = (e)=>{
        setEditValue(e.target.value);
    }
    const handleEdit = (editIndex)=>{
        setEditIndex(editIndex);
        setEditValue(listItems[editIndex]);
    }
      const handleCancelClick = () => {
    setEditIndex(null);
    setEditValue("");
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
    return(
        <div>
            <div>
                ------TO DO LIST-------
            </div>
            <div>
                <input type="text" placeholder="add your todo" value={inputValue} onChange={handleChange}></input>
                <button onClick={handleAdd}>Add</button>
            </div>
            <div>
                {/* <ul>
                    {listItems.map((item,index)=>{
                       return <li key={index}>{item}<button onClick={()=>handleEdit(index)}>Edit</button>
                <button onClick={()=>handleDelete(index)}>Delete</button></li>
                       
                })}
                </ul> */}
                <ul>
                    {listItems.map((item,index)=>(
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
                            ):
                            (
                                <>
                                {item}
                                <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </>
                            )
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}