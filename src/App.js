import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game(){

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const XTurn = (currentMove % 2 == 0);

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    const newCurrentMove = nextHistory.length - 1;
    setCurrentMove(newCurrentMove);
  }

  function jumpTo(move){
    setCurrentMove(move);
  }
  
  const moves = history.map((squares,move)=>{
    let description;
    if(move > 0){
      description = `Go back to ${move}`
    }
    else{
      description = "Go to Game Start";
    }
    return(
      <li key = {move}>
        <button onClick = {()=>jumpTo(move)}>{description}</button>
      </li>
    );

  })

  return(
    <div className="game">
      <div className="game-board">
        <Board XTurn = {XTurn} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );

}

function Board({XTurn, squares, onPlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [XTurn, setXTurn] = useState(true);
  const [status, setStatus] = useState("Next Turn: X");

  function calculateWinner(squares) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winCombinations.length; i++) {
      const [a, b, c] = winCombinations[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
      // if(squares[i][0])
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = XTurn ? "X" : "O";
    onPlay(newSquares);
    // setSquares(newSquares);
    const winner = calculateWinner(newSquares);
    if (winner) {
      setStatus("Winner is " + winner);
    } else {
      setStatus("Next Turn: " + (XTurn ? "X" : "O"));
    }
    // setXTurn(!XTurn);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}