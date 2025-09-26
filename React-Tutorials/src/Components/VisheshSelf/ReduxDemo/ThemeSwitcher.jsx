// ThemeSwitcher.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./slice/themeSlice";

export default function ThemeSwitcher() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const appStyle = {
    padding: "20px",
    backgroundColor: mode === "light" ? "#f0f0f0" : "#333",
    color: mode === "light" ? "#333" : "#f0f0f0",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyle}>
      <h1>Current Theme: {mode}</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </div>
  );
}
