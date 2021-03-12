import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Board, Props } from './Board';

export default {
  component: Board,
  title: 'Board',
} as Meta;

const Template: Story<Props> = ({ squares, onClick }: Props) => (
  <Board {...{ squares, onClick }} />
);

export const Default = Template.bind({});
Default.args = {
  squares: Array(9).fill(null),
  onClick: action('Square Area is clicked'),
};

export const AllX = Template.bind({});
AllX.args = {
  ...Default.args,
  squares: Array(9).fill('X'),
};

export const AllO = Template.bind({});
AllO.args = {
  ...Default.args,
  squares: Array(9).fill('O'),
};

export const AllTriangle = Template.bind({});
AllTriangle.args = {
  ...Default.args,
  squares: Array(9).fill('△'),
};
