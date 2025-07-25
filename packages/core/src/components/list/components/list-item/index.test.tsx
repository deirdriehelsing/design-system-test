import { render, screen } from '@testing-library/react';
import ListItem from '.';
import React from 'react';

describe('<ListItem />', () => {
  it('renders subheader', () => {
    render(<ListItem item={{ role: 'subheader', text: 'Subheader' }} />);

    expect(screen.getByText('Subheader')).toBeInTheDocument();
  });

  it('renders list item', () => {
    render(
      <ListItem
        item={{
          role: 'action',
          text: 'Action',
          componentProps: { href: 'https://www.varsitytutors.com/' },
        }}
      />
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders divider', () => {
    render(<ListItem item={{ role: 'divider' }} />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders nested list', () => {
    render(
      <ListItem
        item={{
          role: 'nested',
          text: 'Nested List',
          items: [
            {
              role: 'action',
              text: 'Nested Action',
              componentProps: { href: 'https://www.varsitytutors.com/' },
            },
          ],
        }}
      />
    );

    expect(screen.getByText('Nested List')).toBeInTheDocument();
  });
});
