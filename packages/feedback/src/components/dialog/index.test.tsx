import { render, screen } from '@testing-library/react';
import Button from '@blueshift-ui/core/dist/components/button';
import Dialog from '.';
import React from 'react';

jest.mock('@blueshift-ui/core/dist/components/divider', () => () => <div>divider</div>);

describe('<Dialog />', () => {
  describe('when title and content passed', () => {
    it('renders correctly when opened', async () => {
      render(
        <Dialog open={true} title="Title">
          Test Content
        </Dialog>
      );

      expect(await screen.findByText('Title')).toBeVisible();
      expect(await screen.findByText('Test Content')).toBeVisible();
    });

    it('should not render when open is false', () => {
      render(
        <Dialog open={false} title="Title">
          Test Content
        </Dialog>
      );

      expect(screen.queryAllByText('Title')).toHaveLength(0);
      expect(screen.queryAllByText('Test Content')).toHaveLength(0);
    });
  });

  describe('with action buttons', () => {
    it('renders correctly', async () => {
      render(
        <Dialog
          actions={[<Button key="disagree">Disagree</Button>, <Button key="agree">Agree</Button>]}
          open={true}
          title="Title"
        >
          Test Content
        </Dialog>
      );

      expect(await screen.findByText('Disagree')).toBeVisible();
      expect(await screen.findByText('Agree')).toBeVisible();
    });
  });

  describe('when showing close button', () => {
    it('renders correctly', async () => {
      render(
        <Dialog open={true} title="Title" withCloseButton={true}>
          Test Content
        </Dialog>
      );

      expect(await screen.findByLabelText('close')).toBeVisible();
    });
  });

  describe('when hiding close button', () => {
    it('renders correctly', () => {
      render(
        <Dialog open={true} title="Title" withCloseButton={false}>
          Test Content
        </Dialog>
      );

      expect(screen.queryByLabelText('close')).not.toBeInTheDocument();
    });
  });

  describe('when withBottomLock is true', () => {
    it('renders close button', async () => {
      render(
        <Dialog anchor="bottom" open={true} title="Title">
          Test Content
        </Dialog>
      );

      expect(await screen.findByLabelText('close')).toBeInTheDocument();
    });
  });

  describe('when withDividers is true', () => {
    it('renders top and bottom dividers', async () => {
      render(
        <Dialog open={true} title="Title" withDividers={true}>
          Test Content
        </Dialog>
      );

      expect((await screen.findAllByText('divider')).length).toBe(1);
    });
  });

  describe('support for extra content', () => {
    it('supports right content', async () => {
      render(
        <Dialog open={true} rightContent={<div>Right Content</div>}>
          Test Content
        </Dialog>
      );

      const rightContent = await screen.findAllByText('Right Content');
      expect(rightContent).toHaveLength(2);
      expect(rightContent[0]).toBeInTheDocument();
      expect(rightContent[1]).toBeInTheDocument();
    });

    it('supports top content', async () => {
      render(
        <Dialog open={true} topContent={<div>Top Content</div>}>
          Test Content
        </Dialog>
      );

      expect(await screen.findByText('Top Content')).toBeInTheDocument();
    });
  });
});
