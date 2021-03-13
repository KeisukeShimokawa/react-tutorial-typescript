import React from 'react';
import { SquareValue } from '../../types/tictactoe';
import './Square.css';

export interface Props {
  value: SquareValue;
  onClick(): void;
}

export const Square = ({ value, onClick }: Props): JSX.Element => (
  <button type="button" className="square" onClick={onClick}>
    {value}
  </button>
);
