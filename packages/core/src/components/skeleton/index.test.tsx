import React from 'react';
import Skeleton from '.';
import { render } from '@testing-library/react';

describe('<Skeleton />', () => {
  it('renders', () => {
    render(<Skeleton />);
  });
});
