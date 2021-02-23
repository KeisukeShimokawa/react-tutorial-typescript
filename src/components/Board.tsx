import React from 'react';
import { Square } from './Square';

export interface Props {
  squares: string[];
  onClick: (i: number) => void;
}

export const Board: React.FunctionComponent<Props> = ({
  squares,
  onClick,
}: Props) => {
  return (
    <div>
      {[0, 1, 2].map((x, i) => {
        return (
          <div className="board-row" key={i}>
            {[0, 1, 2].map((y, j) => {
              const index = 3 * i + j;
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
