import Pagination from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Pagination />', () => {
  it('renders', () => {
    render(<Pagination count={10} />);
  });
});
