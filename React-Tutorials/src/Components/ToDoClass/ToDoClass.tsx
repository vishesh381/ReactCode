import React, { Component } from "react";
import TodoItemClass from "./TodoItemClass";
import { v4 as uuidv4 } from "uuid";
import "./TodoClass.css";

type TodoItem = {
  id: string;
  value: string;
  isCompleted: boolean;
};

type State = {
  todoItem: string;
  todoList: TodoItem[];
  editInput: string;
  editingId: string | null;
};

class TodoClass extends Component<{}, State> {
  state: State = {
    todoItem: "",
    todoList: [],
    editInput: "",
    editingId: null,
  };

  handleTodoItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todoItem: e.target.value });
  };

  addTodoItem = () => {
    const { todoItem, todoList } = this.state;
    if (todoItem.trim() === "") return;

    const newItem: TodoItem = {
      id: uuidv4(),
      value: todoItem.trim(),
      isCompleted: false,
    };

    this.setState({
      todoList: [...todoList, newItem],
      todoItem: "",
    });
  };

  editTodo = (item: TodoItem) => {
    if (this.state.editingId !== null) {
      alert("Please save the current editing item first.");
      return;
    }
    this.setState({ editInput: item.value, editingId: item.id });
  };

  deleteTodo = (id: string) => {
    this.setState((prevState) => ({
      todoList: prevState.todoList.filter((item) => item.id !== id),
      // reset editing if deleting the edited item
      editingId: prevState.editingId === id ? null : prevState.editingId,
      editInput: prevState.editingId === id ? "" : prevState.editInput,
    }));
  };

  saveTodo = (id: string) => {
    const { editInput } = this.state;
    if (editInput.trim() === "") return;

    this.setState((prevState) => ({
      todoList: prevState.todoList.map((todo) =>
        todo.id === id ? { ...todo, value: editInput.trim() } : todo
      ),
      editingId: null,
      editInput: "",
    }));
  };

  cancelEdit = () => {
    this.setState({ editInput: "", editingId: null });
  };

  toggleCompleted = (id: string) => {
    if (this.state.editingId === id) {
      alert("Please save the current editing item first.");
      return;
    }

    this.setState((prevState) => ({
      todoList: prevState.todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }));
  };

  handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editInput: e.target.value });
  };

  render() {
    const { todoItem, todoList, editingId, editInput } = this.state;

    const pendingTodos = todoList.filter((todo) => !todo.isCompleted);
    const completedTodos = todoList.filter((todo) => todo.isCompleted);

    return (
      <div className="todo-app">
        <div className="input-container">
          <input
            type="text"
            placeholder="Add task to the list"
            value={todoItem}
            onChange={this.handleTodoItemChange}
          />
          <button onClick={this.addTodoItem}>Add</button>
        </div>

        <div className="todo-list-container">
          {pendingTodos.length > 0 && (
            <div className="todo-container">
              <h2>Pending Todos</h2>
              <ul>
                {pendingTodos.map((item) => (
                  <TodoItemClass
                    key={item.id}
                    item={item}
                    editingId={editingId}
                    editInput={editInput}
                    handleEditInput={this.handleEditInput}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    editTodo={this.editTodo}
                    deleteTodo={this.deleteTodo}
                    toggleCompleted={this.toggleCompleted}
                  />
                ))}
              </ul>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="todo-container">
              <h2>Completed Todos</h2>
              <ul>
                {completedTodos.map((item) => (
                  <TodoItemClass
                    key={item.id}
                    item={item}
                    editingId={editingId}
                    editInput={editInput}
                    handleEditInput={this.handleEditInput}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    editTodo={this.editTodo}
                    deleteTodo={this.deleteTodo}
                    toggleCompleted={this.toggleCompleted}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TodoClass;
