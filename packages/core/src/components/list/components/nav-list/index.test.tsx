import type { NavItem } from '../../../../types';

import { render, screen } from '@testing-library/react';
import Link from '../../../link';
import NavList from '.';
import React from 'react';

const items = [
  {
    role: 'subheader',
    text: 'Subheader',
  },
  {
    role: 'action',
    text: 'Action',
  },
  {
    role: 'action',
    text: 'Action 2',
    component: Link,
    componentProps: {
      href: 'https://www.varsitytutors.com/',
    },
  },
  {
    role: 'nested',
    text: 'Nested List',
    items: [
      {
        role: 'action',
        text: 'Nested Action',
      },
    ],
  },
  {
    role: 'divider',
  },
] as NavItem[];

describe('<NavList />', () => {
  describe('when the component is rendered', () => {
    it('renders subheader', () => {
      render(<NavList items={items} />);
      expect(screen.getByText('Subheader')).toBeInTheDocument();
    });

    it('renders list item', () => {
      render(<NavList items={items} />);
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders list item with a link', () => {
      render(<NavList items={items} />);
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });

    it('renders divider', () => {
      render(<NavList items={items} />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders nested list', () => {
      render(<NavList items={items} />);
      expect(screen.getByText('Nested List')).toBeInTheDocument();
    });
  });
});
