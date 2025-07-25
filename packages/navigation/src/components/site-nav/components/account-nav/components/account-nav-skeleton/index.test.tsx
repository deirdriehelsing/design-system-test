import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AccountNavSkeleton from '.';
import React from 'react';

describe('<AccountNavSkeleton />', () => {
  it('renders both name and avatar loading indicators by default', () => {
    render(<AccountNavSkeleton withAvatar={true} />);

    // eslint-disable-next-line testing-library/no-node-access
    const loadingElements = screen.getByLabelText('loading').childElementCount;
    expect(loadingElements).toEqual(3);
  });

  it('renders only name loading indicator when withAvatar is false', () => {
    render(<AccountNavSkeleton withAvatar={false} />);

    // eslint-disable-next-line testing-library/no-node-access
    const loadingElements = screen.getByLabelText('loading').childElementCount;
    expect(loadingElements).toEqual(2);
  });
});
