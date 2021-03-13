import React from 'react';
import { BoardValue } from '../../types/tictactoe';
import { Board } from '../Board/Board';

export interface Props {
  status: string;
  current: BoardValue;
  history: BoardValue[];
  handleClick: (i: number) => void;
  jumpTo: (step: number) => void;
}

export const Game = ({
  status,
  current,
  history,
  handleClick,
  jumpTo,
}: Props): JSX.Element => {
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button type="button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
