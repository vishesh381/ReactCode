import React, { Component } from "react";

type TodoItem = {
  id: string;
  value: string;
  isCompleted: boolean;
};

type Props = {
  item: TodoItem;
  editingId: string | null;
  editInput: string;
  handleEditInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveTodo: (id: string) => void;
  cancelEdit: () => void;
  editTodo: (item: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleCompleted: (id: string) => void;
};

class TodoItemClass extends Component<Props> {
  render() {
    const {
      item,
      editingId,
      editInput,
      handleEditInput,
      saveTodo,
      cancelEdit,
      editTodo,
      deleteTodo,
      toggleCompleted,
    } = this.props;

    const isEditing = editingId === item.id;

    return (
      <li className="todo-item">
        {isEditing ? (
          <>
            <input type="text" value={editInput} onChange={handleEditInput} />
            <button onClick={() => saveTodo(item.id)}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <span style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
              {item.value}
            </span>
            <button onClick={() => editTodo(item)}>Edit</button>
            <button onClick={() => toggleCompleted(item.id)}>
              {item.isCompleted ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(item.id)}>Delete</button>
          </>
        )}
      </li>
    );
  }
}

export default TodoItemClass;
