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
  current: { squares: ['半', null, null, null, null, null, null, null, null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['半', null, null, null, null, null, null, null, null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TurnNo2 = Template.bind({});
TurnNo2.args = {
  status: 'Next Player: O',
  current: { squares: ['半', null, null, null, '丁', null, null, null, null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['半', null, null, null, null, null, null, null, null] },
    { squares: ['半', null, null, null, '丁', null, null, null, null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TurnNo5 = Template.bind({});
TurnNo5.args = {
  status: 'Next Player: O',
  current: { squares: ['半', '丁', '半', null, '丁', null, null, '半', null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['半', null, null, null, null, null, null, null, null] },
    { squares: ['半', null, null, null, '丁', null, null, null, null] },
    { squares: ['半', null, '半', null, '丁', null, null, null, null] },
    { squares: ['半', '丁', '半', null, '丁', null, null, null, null] },
    { squares: ['半', '丁', '半', null, '丁', null, null, '半', null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};

export const TuenNo8WinnerO = Template.bind({});
TuenNo8WinnerO.args = {
  status: 'Winner: O',
  current: { squares: ['半', '丁', '半', '丁', '丁', '丁', '半', '半', null] },
  history: [
    { squares: Array(9).fill(null) },
    { squares: ['半', null, null, null, null, null, null, null, null] },
    { squares: ['半', null, null, null, '丁', null, null, null, null] },
    { squares: ['半', null, '半', null, '丁', null, null, null, null] },
    { squares: ['半', '丁', '半', null, '丁', null, null, null, null] },
    { squares: ['半', '丁', '半', null, '丁', null, null, '半', null] },
    { squares: ['半', '丁', '半', '丁', '丁', null, null, '半', null] },
    { squares: ['半', '丁', '半', '丁', '丁', null, '半', '半', null] },
    { squares: ['半', '丁', '半', '丁', '丁', '丁', '半', '半', null] },
  ],
  handleClick: action('handleClick is done'),
  jumpTo: action('jumpTo is done'),
};
