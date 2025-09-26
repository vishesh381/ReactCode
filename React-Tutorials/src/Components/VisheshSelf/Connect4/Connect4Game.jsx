import React, { useState } from "react";
import "./Connect4Game.css";

const ROWS = 6;
const COLS = 7;

export default function Connect4Game() {
  const [board, setBoard] = useState(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null))
  );
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const dropDisc = (col) => {
    if (winner) return; //we have a winner

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = player;
        setBoard(newBoard);

        if (checkWinner(newBoard, row, col, player)) {
          setWinner(player);
        } else {
          setPlayer(player === "X" ? "O" : "X");
        }
        break;
      }
    }
}
const checkWinner = (board, row, col, player) => {
    return (
      checkDirection(board, row, col, player, 0, 1) || // horizontal
      checkDirection(board, row, col, player, 1, 0) //vertical
    );
  };
const checkDirection = (board, row, col, player, rowDir, colDir) => {
    let count = 1;

    // check forward
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += rowDir;
      c += colDir;
    }

    // check backward
    r = row - rowDir;
    c = col - colDir;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r -= rowDir;
      c -= colDir;
    }

    return count >= 4;
  };
  const resetGame = () => {
  setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  setPlayer("X");
  setWinner(null);
};
  return (
    <div className="connect4-container">
      <h1>Connect 4</h1>
      <div className="board">
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => dropDisc(cIdx)}
              className="cell"
            >
              {cell && <div className={`disc ${cell}`} />}
            </div>
          ))
        )}
      </div>
      {winner ? (
        <div>
    <h2>🎉 Winner: {winner} 🎉</h2>
    <button onClick={resetGame}>Play Again?</button>
  </div>
      ) : (
        <p>Current Turn: {player}</p>
      )}
      <p><u>Note: X is red and O is yellow</u></p>
    </div>
  );
}
