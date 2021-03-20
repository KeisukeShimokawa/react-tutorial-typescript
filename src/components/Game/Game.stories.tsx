import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Game, Props } from './Game';

export default {
  component: Game,
  title: 'Game',
} as Meta;

const Template: Story<Props> = ({
  status,
  current,
  history,
  handleClick,
  jumpTo,
}: Props) => <Game {...{ status, current, history, handleClick, jumpTo }} />;

export const Default = Template.bind({});
Default.args = {
  status: 'Next Player: X',
  current: { squares: Array(9).fill(null) },
  history: [{ squares: Array(9).fill(null) }],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TurnNo1 = Template.bind({});
TurnNo1.args = {
  status: 'Next Player: O',
  current: { squares: ['X', null, null, null, null, null, null, null, null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['X', null, null, null, null, null, null, null, null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TurnNo2 = Template.bind({});
TurnNo2.args = {
  status: 'Next Player: O',
  current: { squares: ['X', null, null, null, 'O', null, null, null, null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['X', null, null, null, null, null, null, null, null] },
    { squares: ['X', null, null, null, 'O', null, null, null, null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TurnNo5 = Template.bind({});
TurnNo5.args = {
  status: 'Next Player: O',
  current: { squares: ['X', 'O', 'X', null, 'O', null, null, 'X', null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['X', null, null, null, null, null, null, null, null] },
    { squares: ['X', null, null, null, 'O', null, null, null, null] },
    { squares: ['X', null, 'X', null, 'O', null, null, null, null] },
    { squares: ['X', 'O', 'X', null, 'O', null, null, null, null] },
    { squares: ['X', 'O', 'X', null, 'O', null, null, 'X', null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TuenNo8WinnerO = Template.bind({});
TuenNo8WinnerO.args = {
  status: 'Winner: O',
  current: { squares: ['X', 'O', 'X', 'O', 'O', 'O', 'X', 'X', null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['X', null, null, null, null, null, null, null, null] },
    { squares: ['X', null, null, null, 'O', null, null, null, null] },
    { squares: ['X', null, 'X', null, 'O', null, null, null, null] },
    { squares: ['X', 'O', 'X', null, 'O', null, null, null, null] },
    { squares: ['X', 'O', 'X', null, 'O', null, null, 'X', null] },
    { squares: ['X', 'O', 'X', 'O', 'O', null, null, 'X', null] },
    { squares: ['X', 'O', 'X', 'O', 'O', null, 'X', 'X', null] },
    { squares: ['X', 'O', 'X', 'O', 'O', 'O', 'X', 'X', null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};
