import React, { useEffect, useState } from 'react'
import './TransferListStyles.css';
const TransferList = () => {
    const [todos,setTodos] = useState([]);
    const [leftList, setLeftList] = useState([]);
    const [rightList, setRightList] = useState([]);
    const [selected,setSelected] = useState({side:null,index:null});
    const fetchTodos = async()=>{
        try{
            const fetchData = await fetch("https://dummyjson.com/todos");
        const fetchDataJson = await fetchData.json();
        console.log("fetchDataJson+++",fetchDataJson.todos);
        setTodos(fetchDataJson.todos);
        setLeftList(fetchDataJson.todos);
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchTodos();
    },[])
    const handleSelect = (side,index)=>{
        console.log("side",side);
        console.log("index",index);
        if (selected.side === side && selected.index === index) {
      setSelected({ side: null, index: null });
    } else {
      setSelected({ side, index });
    }
    }
    const handleRightClick= ()=>{
        if(selected.side !== "left" && selected.index !== null) return;
            
            setRightList([...rightList,leftList[selected.index]]);
            const updatedLeftList = [...leftList];
            setLeftList(updatedLeftList.filter((_,index)=>(index!==selected.index)));
            console.log("rightList++++",rightList);
            console.log("leftList+++",leftList);
            setSelected({ side: null, index: null });
        
    }
   const handleLeftClick = () => {
  if (selected.side !== "right" || selected.index == null) return;

  const item = rightList[selected.index];
  setLeftList(prev => [...prev, item]);                           // add to left
  setRightList(prev => prev.filter((_, i) => i !== selected.index)); // remove from right
  console.log("rightListleftClick++++",rightList);
            console.log("leftListleftclick+++",leftList);
  setSelected({ side: null, index: null });
};
  return (
    <>
    
     <div className="main-container">
    <h2>Transfer List</h2>

  <div className="transfer-container">
    
    {/* Left List */}
    <div className="list-card">
      <h3>Do's</h3>
      {leftList.map((item, index) =>
        Object.entries(item).map(([key, value]) =>
          key === "todo" ? (
            <button
              key={`L-${index}`}
              type="button"
              onClick={() => handleSelect("left", index)}
              className={
                selected.side === "left" && selected.index === index
                  ? "item selected"
                  : "item"
              }
            >
              {item.todo ?? String(item)}
            </button>
          ) : null
        )
      )}
    </div>

    {/* Buttons in Middle */}
    <div className="transfer-buttons">
      <button onClick={handleRightClick} disabled={selected.side !== 'left'}>{"->"}</button>
      <button onClick={handleLeftClick} disabled={selected.side !== 'right'}>{"<-"}</button>
    </div>

    {/* Right List */}
    <div className="list-card">
      <h3>Don't</h3>
      {rightList.map((item, index) =>
        Object.entries(item).map(([key, value]) =>
          key === "todo" ? (
            <button
              key={`L-${index}`}
              type="button"
              onClick={() => handleSelect("right", index)}
              className={
                selected.side === "right" && selected.index === index
                  ? "item selected"
                  : "item"
              }
            >
              {item.todo ?? String(item)}
            </button>
          ) : null
        )
      )}
    </div>

  </div>
</div>
    </>
  )
}

export default TransferList
