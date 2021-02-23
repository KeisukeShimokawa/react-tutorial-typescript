import React from 'react';
import '../index.css';

export interface Props {
  value: string;
  onClick: () => void;
}

export const Square: React.FunctionComponent<Props> = ({
  value,
  onClick,
}: Props) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};
