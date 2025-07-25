import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PieChart from '.';
import React from 'react';

describe('<PieChart />', () => {
  it('renders', () => {
    render(
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
            ],
          },
        ]}
      />
    );

    expect(screen.getAllByText('series A')[0]).toBeInTheDocument();
    expect(screen.getAllByText('series B')[0]).toBeInTheDocument();
  });
});
