import type { NavContentItem } from '../../../../types';

import { render, screen } from '@testing-library/react';
import PrimaryNav from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

const menus: NavContentItem[] = [
  {
    href: '/my-learning',
    slug: 'logo_member',
    text: 'Varsity Tutors',
  },
  {
    items: [
      {
        text: 'My Schedule',
        href: '/my-learning/sessions',
      },
      {
        text: 'My Tutors',
        href: '/my-learning/tutors',
      },
      {
        text: 'Message My Tutor',
        href: '/my-learning/tutors/message',
        enablement: 'active_membership',
      },
    ],
    slug: 'tutoring_member',
    text: 'Tutoring',
  },
  {
    items: [
      {
        text: 'Art',
        items: [
          {
            text: 'Drawing',
            href: '/my-learning/subjects/drawing',
          },
          {
            text: 'Fine Arts',
            href: '/my-learning/subjects/fine-arts',
          },
        ],
      },
    ],
    slug: 'subjects_member',
    text: 'Subjects',
  },
  {
    items: [
      {
        text: 'Explore Live Classes',
        href: '/classes/search',
      },
      {
        text: 'My Past Classes',
        href: '/my-learning/classes/past',
      },
    ],
    slug: 'classes_member',
    text: 'Classes & Self-Guided',
  },
  {
    items: [
      {
        text: 'Switch/Manage Profiles',
        href: '/my-learning/profile/select',
      },
      {
        text: 'Account',
        href: 'https://account.varsitytutors.com/client',
      },
    ],
    slug: 'account_member',
    text: 'Account',
  },
];

describe('<PrimaryNav />', () => {
  it('renders a drawer of nav items', async () => {
    const user = userEvent.setup();

    render(<PrimaryNav asDrawer={true} items={menus} />);

    // need to click drawer hamburger icon to see menus
    expect(screen.queryByText('Tutoring')).not.toBeInTheDocument();
    await user.click(screen.getByLabelText('Menu'));

    expect(screen.getByText('Tutoring')).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('Classes & Self-Guided')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();

    // need to click drawer item to see nested items
    expect(screen.queryByText('My Schedule')).not.toBeInTheDocument();
    await user.click(screen.getByText('Tutoring'));

    expect(screen.getByText('My Schedule')).toBeInTheDocument();
    expect(screen.getByText('My Tutors')).toBeInTheDocument();
    expect(screen.getByText('Message My Tutor')).toBeInTheDocument();
  });

  it('renders a dropdown of nav items', async () => {
    const user = userEvent.setup();

    render(<PrimaryNav items={menus} />);

    expect(screen.queryByLabelText('Menu')).not.toBeInTheDocument();

    expect(screen.getByText('Tutoring')).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('Classes & Self-Guided')).toBeInTheDocument();

    // need to click drawer item to see nested items
    expect(screen.queryByText('My Schedule')).not.toBeInTheDocument();
    await user.click(screen.getByText('Tutoring'));

    expect(screen.getByText('My Schedule')).toBeInTheDocument();
    expect(screen.getByText('My Tutors')).toBeInTheDocument();
    expect(screen.getByText('Message My Tutor')).toBeInTheDocument();
  });
});
