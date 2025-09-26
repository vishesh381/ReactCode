import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  editIndex: number | null;
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      return data.slice(0, 5).map((t: any) => ({
        text: t.title,
        completed: t.completed,
      }));
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState: TodoState = {
  todos: [],
  editIndex: null,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const timestamp = `Added at ${new Date().toISOString().split("T")[0]}: `;
      state.todos.push({ text: `${timestamp}${action.payload}`, completed: false });
    },
    startEdit: (state, action: PayloadAction<number>) => {
      state.editIndex = action.payload;
    },
    saveEdit: (state, action: PayloadAction<string>) => {
      if (state.editIndex !== null) {
        state.todos[state.editIndex].text = action.payload;
        state.editIndex = null;
      }
    },
    cancelEdit: (state) => {
      state.editIndex = null;
    },
    markComplete: (state, action: PayloadAction<number>) => {
      state.todos[action.payload].completed = true;
    },
    markPending: (state, action: PayloadAction<number>) => {
      state.todos[action.payload].completed = false;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addTodo,
  startEdit,
  saveEdit,
  cancelEdit,
  markComplete,
  markPending,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
