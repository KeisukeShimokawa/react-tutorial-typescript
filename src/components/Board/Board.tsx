import React from 'react';
import { Square } from '../Square/Square';

export interface Props {
  squares: string[];
  onClick: (i: number) => void;
}

export const Board: React.FunctionComponent<Props> = ({
  squares,
  onClick,
}: Props): JSX.Element => {
  return (
    <div>
      {[0, 1, 2].map((rowIndex) => {
        return (
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
        );
      })}
    </div>
  );
};
