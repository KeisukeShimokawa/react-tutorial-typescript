import { useState } from 'react';
import { BoardValue } from '../types/tictactoe';
import calculateWinner from '../util/calculateWinner';

const useTicTacToe = (): [
  string,
  BoardValue,
  BoardValue[],
  (i: number) => void,
  (step: number) => void,
] => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [history, setHistory] = useState<BoardValue[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      newHistory.concat([
        {
          squares,
        },
      ]),
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;

    if (history.length === 10) {
      status = 'Draw!';
    }
  }

  return [status, current, history, handleClick, jumpTo];
};

export default useTicTacToe;
