import LineChart from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<LineChart />', () => {
  it('renders', () => {
    render(<LineChart series={[]} xAxis={[]} />);
  });
});
