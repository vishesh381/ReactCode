import React from "react";

class ToDoListClass extends React.Component{
    state={
        inputValue:"",
        listItems : [],
        editIndex: null,
        editValue: ""
    }
    handleChange=(e)=>{
        this.setState({ inputValue: e.target.value });
        console.log("inputValue++",this.state.inputValue);
    }
    handleAdd = () => {
  if (this.state.inputValue.trim() === "") return;

  this.setState((prevState) => ({
    listItems: [...prevState.listItems, prevState.inputValue],
    inputValue: "",
  }));
};
handleDelete = (indexToDelete) => {
    this.setState((prevState) => {
      const newArr = prevState.listItems.filter((_, index) => index !== indexToDelete);
      let newEditIndex = prevState.editIndex;
      let newEditValue = prevState.editValue;
      if (indexToDelete === prevState.editIndex) {
        newEditIndex = null;
        newEditValue = "";
      }
      return {
        listItems: newArr,
        editIndex: newEditIndex,
        editValue: newEditValue,
      };
    });
  };
handleEditChange = (e)=>{
    this.setState({editValue:e.target.value});
}
  handleEditClick = (editIndex) => {
    this.setState({
      editIndex: editIndex,
      editValue: this.state.listItems[editIndex],
    });
  };
handleCancelClick = () => {
    this.setState({ editIndex: null, editValue: "" });
  };

  handleSaveClick = () => {
    const { editIndex, editValue, listItems } = this.state;
    if (editValue.trim() === "" || editIndex === null) return;

    const updatedList = [...listItems];
    updatedList[editIndex] = editValue;

    this.setState({
      listItems: updatedList,
      editIndex: null,
      editValue: "",
    });
  };
  componentDidMount() {
    console.log("Component mounted");
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      this.setState({ listItems: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.listItems !== this.state.listItems) {
      console.log("List updated:", this.state.listItems);
      localStorage.setItem("todos", JSON.stringify(this.state.listItems));
    }
    if (prevState.inputValue !== this.state.inputValue) {
      console.log("Input changed:", this.state.inputValue);
    }
  }

    render(){
        return(
            <>
                <input type="text" placeholder="add your todo" value={this.state.inputValue} onChange={this.handleChange}></input>
                <button onClick={this.handleAdd}>ADD</button>
                <div>
                    <ul>
                         {this.state.listItems.map((item,index)=>(
                        <li key={index}>
                            {this.state.editIndex === index ? (
                                <>
                                <input
                      type="text"
                      value={this.state.editValue}
                      onChange={this.handleEditChange}
                    />
                    <button onClick={this.handleSaveClick}>Save</button>
                    <button onClick={this.handleCancelClick}>Cancel</button>
                                </>
                            ):
                            (
                                <>
                                {item}
                                <button onClick={() => this.handleEditClick(index)}>Edit</button>
                    <button onClick={() => this.handleDelete(index)}>Delete</button>
                                </>
                            )
                            }
                        </li>
                    ))}
                    </ul>
                    
                </div>
            </>
        )
    }

}
export default ToDoListClass;