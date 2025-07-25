import type { Meta, StoryObj } from '@storybook/react';
import type { UserProductState, UserRole } from '@blueshift-ui/auth';
import type { HTMLAttributes } from 'react';

import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import SiteNav from '.';

(SiteNav as React.FunctionComponent).displayName = 'SiteNav';

const meta: Meta<typeof SiteNav> = {
  title: 'Navigation/Site Nav',
  component: SiteNav,
  args: {
    applicationId: 'blueshift-ui',
    preview: true,
    sx: {
      left: 'unset',
      right: 'unset',
      position: 'absolute',
      transform: 'translateY(-30px)',
    },
    withoutSlide: true,
  },
  argTypes: {
    navSlug: {
      description: 'The slug of nav data to fetch',
    },
    preview: {
      description: 'Flag for loading preview data or not.',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    searchBarProps: {
      description: 'Props to pass to the search bar.',
      defaultValue: {},
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'object' },
      },
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          minHeight: '4.5rem',
          position: 'relative',
          width: 'calc(100vw - 2rem)',
          '.innerZoomElementWrapper &': {
            maxWidth: '1000px',
          },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

const sampleStudent = {
  enrolled: true,
  first_name: 'Buzz',
  grade_list_id: 1,
  id: 1,
  last_name: 'Aldrin',
  student_user_id: 'mock-student-user-id',
  user_id: 'mock-user-id',
  uuid: 'mock-uuid',
};
const sampleUser = {
  client_id: 123,
  client_uuid: 'mock-client-id',
  first_name: 'Neil',
  id: 0,
  jurisdiction_id: 123,
  last_name: 'Armstrong',
  login: 'test',
  product_state: 'one_on_one_membership' as UserProductState,
  role: 'client' as UserRole,
  students: [sampleStudent],
};

type Story<Props = unknown> = StoryObj<typeof SiteNav<Props>>;

const NoNavSlug: Story = {
  name: 'No Nav Slug',
  args: {
    navSlug: undefined,
  },
};

const SignedIn: Story = {
  args: {
    navSlug: 'vt_membership_navbar_standard_subjects',
    preview: true,
    user: sampleUser,
  },
  name: 'Signed in',
};

const SignedIn_AccountOnly: Story = {
  args: {
    navSlug: 'vt_membership_navbar_standard_subjects',
    preview: true,
    user: sampleUser,
    variant: 'account-only',
  },
  name: 'Signed in, account menu only',
};

const SignedIn_LogoOnly: Story = {
  args: {
    navSlug: 'vt_membership_navbar_standard_subjects',
    preview: true,
    user: sampleUser,
    variant: 'logo-only',
  },
  name: 'Signed in, logo menu only',
};

const SignedIn_SelectedLearner: Story = {
  args: {
    navSlug: 'vt_membership_navbar_standard_subjects',
    activeLearner: sampleStudent,
    preview: true,
    user: sampleUser,
  },
  name: 'Signed in, with active learner',
};

const SignedIn_WithCustomLinks: Story<HTMLAttributes<HTMLSpanElement>> = {
  args: {
    applicationId: 'my-learning',
    applicationLinkComponent: (props) => <span {...props} />,
    getApplicationLinkComponentProps: () => ({
      'data-my-link-attribute': 'mock',
      onClick: () => {
        window.alert('Custom link behavior');
      },
    }),
    navSlug: 'vt_membership_navbar_standard_subjects',
    preview: true,
    user: sampleUser,
  },
  name: 'Signed in, with custom links (My Learning links)',
};

const SignedIn_WithSearch: Story = {
  args: {
    activeLearner: sampleStudent,
    navSlug: 'vt_membership_navbar_standard_subjects',
    onSearchSubmit: (query) => console.log(query),
    preview: true,
    user: sampleUser,
    withSearch: true,
  },
  name: 'Signed in with search bar',
};

const SignedIn_WithCustomSearch: Story = {
  args: {
    activeLearner: sampleStudent,
    navSlug: 'vt_membership_navbar_standard_subjects',
    onSearchSubmit: (query) => console.log(query),
    preview: true,
    searchBarProps: {
      searchInputProps: {
        placeholder: 'Custom search prompt',
      },
    },
    user: sampleUser,
    withSearch: true,
  },
  name: 'Signed in with custom search bar',
};

const SignedIn_WithFreemium: Story<HTMLAttributes<HTMLSpanElement>> = {
  args: {
    applicationId: 'my-learning',
    navSlug: 'vt_freemium_navbar',
    preview: true,
    user: sampleUser,
  },
  name: 'Signed in, with Freemium',
};

const SignedOut: Story = {
  name: 'Signed out',
  args: {
    navSlug: 'vt_membership_navbar_standard_subjects',
  },
};

const SignedOut_WithCustomLinks: Story<HTMLAttributes<HTMLDivElement>> = {
  name: 'Signed out, with custom link',
  args: {
    applicationId: 'vtwa',
    applicationLinkComponent: (props) => <div {...props} />,
    getApplicationLinkComponentProps: () => ({
      'data-my-link-attribute': 'mock',
      onClick: () => {
        window.alert('Custom link behaviour');
      },
    }),
    navSlug: 'vt_membership_navbar_standard_subjects',
  },
};

export {
  NoNavSlug,
  SignedOut,
  SignedOut_WithCustomLinks,
  SignedIn,
  SignedIn_SelectedLearner,
  SignedIn_AccountOnly,
  SignedIn_LogoOnly,
  SignedIn_WithCustomLinks,
  SignedIn_WithSearch,
  SignedIn_WithCustomSearch,
  SignedIn_WithFreemium,
};

export default meta;
