import React from 'react';
import { Square } from '../Square/Square';
import { SquareValue } from '../../types/tictactoe';
import './Board.css';

export interface Props {
  squares: SquareValue[];
  onClick(i: number): void;
}

export const Board = ({ squares, onClick }: Props): JSX.Element => {
  const renderSquare = (index: number) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => onClick(index)}
        key={index}
      />
    );
  };

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>

      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};
