import React from 'react';
import { Square } from '../Square/Square';
import { SquareValue } from '../../types/tictactoe';
import './Board.css';

export interface Props {
  squares: SquareValue[];
  onClick(i: number): void;
}

export const Board = ({ squares, onClick }: Props): JSX.Element => (
  <>
    {[0, 1, 2].map((rowIndex) => (
      <div className="board-row" key={rowIndex}>
        {[0, 1, 2].map((colIndex) => {
          const index = 3 * rowIndex + colIndex;
          return (
            <Square
              value={squares[index]}
              onClick={() => onClick(index)}
              key={index}
            />
          );
        })}
      </div>
    ))}
  </>
);
