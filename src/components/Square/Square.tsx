import React from 'react';
import './Square.css';

export interface Props {
  value: string;
  onClick: () => void;
}

export const Square = ({ value, onClick }: Props): JSX.Element => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};
