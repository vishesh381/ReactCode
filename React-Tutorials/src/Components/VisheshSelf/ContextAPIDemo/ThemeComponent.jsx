import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext';

const ThemeComponent = () => {
    const {theme,toggleTheme} = useContext(ThemeContext);
    const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: theme === "light" ? "#eee" : "#333",
    color: theme === "light" ? "#333" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  return (
    <>
    <button style={buttonStyle} onClick={toggleTheme}>
      Current Theme: {theme} (Click to Toggle)
    </button>
    </>
    
  )
}

export default ThemeComponent;
