import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface TodoItem {
  text: string;
  completed: boolean;
}

type State = {
  todos: TodoItem[];
  editIndex: number | null;
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; index: number }
  | { type: "MARK_COMPLETE"; index: number }
  | { type: "MARK_PENDING"; index: number }
  | { type: "START_EDIT"; index: number }
  | { type: "CANCEL_EDIT" }
  | { type: "SAVE_EDIT"; payload: string };

const initialState: State = {
  todos: [],
  editIndex: null,
};

function todoReducer(state: State, action: Action): State {
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
        editIndex: state.editIndex === action.index ? null : state.editIndex,
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
      return { ...state, editIndex: action.index };
    case "CANCEL_EDIT":
      return { ...state, editIndex: null };
    case "SAVE_EDIT":
      if (state.editIndex === null) return state;
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === state.editIndex ? { ...todo, text: action.payload } : todo
        ),
        editIndex: null,
      };
    default:
      return state;
  }
}

const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Errorrr+++++++++++++");
  return context;
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};
