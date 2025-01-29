import React, { useState } from "react";

const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isTurn, setIsTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);

  const winnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newState) => {
    for (let i = 0; i < winnerCombination.length; i++) {
      const [a, b, c] = winnerCombination[i];
      if (
        newState[a] &&
        newState[a] === newState[b] &&
        newState[a] === newState[c]
      ) {
        setWinner(newState[a]);
        setWinningCombination([a, b, c]);
        return true;
      }
    }
    return false;
  };

  const buttonClicked = (index) => {
    if (state[index] || winner) return;

    const newState = [...state];
    newState[index] = isTurn ? "X" : "O";
    setState(newState);
    setIsTurn(!isTurn);

    if (!checkWinner(newState)) {
    }
  };

  const resetGame = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setIsTurn(true);
    setWinningCombination([]);
  };

  return (
    <div className="bg-slate-950 text-white w-full min-h-screen h-[500px] flex flex-col items-center justify-center">
      <div className="w-[400px] h-[400px] flex flex-col items-center justify-center">
        <div className="text-3xl mb-8 py-2 font-bold w-64 text-center bg-slate-900 shadow-slate-700 shadow-lg rounded-lg">
          <h1>Tic Tac Toe</h1>
        </div>

        <div className="text-xl font-medium mb-4">
          {/* Display winner or current player */}
          {winner ? (
            <h3 className="text-green-500">Winner: {winner}</h3>
          ) : (
            <h3>{`Current Player: ${isTurn ? "X" : "O"}`}</h3>
          )}
        </div>

        <div className="w-[315px] h-[315px] grid grid-cols-3 gap-2 text-3xl font-mono">
          {state.map((value, index) => (
            <button
              key={index}
              className={`bg-slate-600 w-[100px] h-[100px] rounded-lg ${
                winningCombination.includes(index) ? "bg-green-500" : ""
              }`} // Highlight winning buttons in green
              onClick={() => buttonClicked(index)}
              disabled={value !== null || winner !== null}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border shadow-slate-700 shadow-lg rounded-xl w-[250px] py-2 flex items-center justify-center mt-5">
          <button onClick={resetGame}>NEW GAME</button>
        </div>
      </div>
    </div>
  );
};

export default App;
