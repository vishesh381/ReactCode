interface Todo {
  text: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
  editIndex: number | null;
}

const initialState: State = {
  todos: [],
  editIndex: null,
};

export const todoReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false }],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== action.index),
      };
    case "MARK_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.index ? { ...todo, completed: true } : todo
        ),
      };
    case "MARK_PENDING":
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.index ? { ...todo, completed: false } : todo
        ),
      };
    case "START_EDIT":
      return {
        ...state,
        editIndex: action.index,
      };
    case "SAVE_EDIT":
      if (state.editIndex === null) return state;
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === state.editIndex ? { ...todo, text: action.payload } : todo
        ),
        editIndex: null,
      };
    case "CANCEL_EDIT":
      return {
        ...state,
        editIndex: null,
      };
    default:
      return state;
  }
};
