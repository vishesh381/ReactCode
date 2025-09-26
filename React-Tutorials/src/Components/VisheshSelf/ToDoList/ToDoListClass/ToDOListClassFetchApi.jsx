import React from 'react'

class ToDOListClassFetchApi extends React.Component{
  state={
        inputValue:"",
        todos : [],
        editIndex: null,
        editValue: ""
    }
    fetchTodos = async ()=>{
      const fetchTodoJson = await fetch ("https://dummyjson.com/todos");
      const todoJsonData = await fetchTodoJson.json();
      this.setState({todos:todoJsonData.todos});
    }
    componentDidMount(){
      this.fetchTodos();
    }
    
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      console.log("todos updated:", this.state.todos); // runs after state committed
    }
  }
    render(){
      return (
    <div>
      
    </div>
  )
    }
}

export default ToDOListClassFetchApi
