import Popover from '.';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Popover />', () => {
  it('renders', () => {
    render(<Popover anchorEl={document.createElement('DIV')} open />);
  });
});
