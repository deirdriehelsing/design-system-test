import { render, screen } from '@testing-library/react';
import Pitch from '.';
import React from 'react';

const MockIcon = () => <div>Mock Icon</div>;

describe('<Pitch />', () => {
  it('should render', () => {
    render(<Pitch icon={<MockIcon />}>Text</Pitch>);

    expect(screen.getByText('Mock Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
