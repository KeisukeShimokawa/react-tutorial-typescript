import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Square, Props } from './Square';

export default {
  component: Square,
  title: 'Square',
} as Meta;

const Template: Story<Props> = ({ value, onClick }: Props) => (
  <Square {...{ value, onClick }} />
);

export const Default = Template.bind({});
Default.args = {
  value: 'X',
};

export const Latter = Template.bind({});
Latter.args = {
  ...Default.args,
  value: 'O',
};
