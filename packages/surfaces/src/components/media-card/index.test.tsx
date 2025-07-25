import { render, screen, waitFor } from '@testing-library/react';
import Link from '@blueshift-ui/core/dist/components/link';
import MediaCard from '.';
import MediaCardAction from '../media-card-action';
import React from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('@blueshift-ui/core/dist/components/skeleton', () => () => <div>Skeleton</div>);

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  disconnect() {}
  observe(target: Element) {
    setTimeout(() => {
      this.callback(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
          } as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver
      );
    }, 50);
  }
  unobserve() {}
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe('<MediaCard />', () => {
  const onPrimaryActionClick = jest.fn();
  const action = <Link>laborum</Link>;
  const actionDetails = 'Consectetur adipiscing elit.';
  const thumbnail = 'blueshift.jpg';
  const overline = 'Duis aute irure';
  const mediaCardAction = <MediaCardAction>laborum</MediaCardAction>;
  const title = 'Excepteur sint occaecat cupidatat';
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  describe('when loading', () => {
    it('renders loading variant', () => {
      render(<MediaCard loading />);

      expect(screen.getAllByText('Skeleton').length).toBeGreaterThan(0);
    });
  });

  describe('when loaded', () => {
    describe('when primary action present', () => {
      it('renders primary action', () => {
        render(<MediaCard actionAreaProps={{ onClick: onPrimaryActionClick }} title={title} />);
        expect(screen.getByRole('button', { name: title })).toBeInTheDocument();
      });

      it('calls primary action correctly on click', async () => {
        render(<MediaCard actionAreaProps={{ onClick: onPrimaryActionClick }} title={title} />);

        const user = userEvent.setup();
        const actionArea = screen.getByRole('button', { name: title });

        user.click(actionArea);

        await waitFor(() => {
          expect(onPrimaryActionClick).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('when primary action not present', () => {
      it('does not render primary action', () => {
        render(<MediaCard title={title} />);
        expect(screen.queryByRole('button', { name: title })).not.toBeInTheDocument();
      });
    });

    describe('when action present', () => {
      describe('when action is a MediaCardAction', () => {
        it('renders action', async () => {
          render(<MediaCard action={mediaCardAction} color="empty" />);
          expect(await screen.findByText('laborum')).toBeVisible();
        });
      });

      describe('when is not a MediaCardAction', () => {
        it('renders action', async () => {
          render(<MediaCard action={action} />);
          expect(await screen.findByText('laborum')).toBeVisible();
        });
      });
    });

    describe('when action not present', () => {
      it('does not render action', () => {
        render(<MediaCard />);
        expect(screen.queryByText('laborum')).not.toBeInTheDocument();
      });
    });

    describe('when action details present', () => {
      it('renders action details', async () => {
        render(<MediaCard action={action} actionDetails={actionDetails} />);
        expect(await screen.findByText(actionDetails)).toBeVisible();
      });
    });

    describe('when action details not present', () => {
      it('does not render action details', () => {
        render(<MediaCard />);
        expect(screen.queryByText(actionDetails)).not.toBeInTheDocument();
      });
    });

    describe('when thumbnail present', () => {
      it('renders thumbnail', async () => {
        render(<MediaCard thumbnail={thumbnail} />);
        expect(await screen.findByRole('img')).toBeInTheDocument();
      });
    });

    describe('when thumbnail not present', () => {
      it('does not render thumbnail', () => {
        render(<MediaCard />);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
      });
    });

    describe('when overline present', () => {
      it('renders overline', async () => {
        render(<MediaCard overline={overline} />);
        expect(await screen.findByText(overline)).toBeVisible();
      });
    });

    describe('when overline not present', () => {
      it('does not render overline', () => {
        render(<MediaCard />);
        expect(screen.queryByText(overline)).not.toBeInTheDocument();
      });
    });

    describe('when title present', () => {
      it('renders title', async () => {
        render(<MediaCard title={title} />);
        expect(await screen.findByText(title)).toBeVisible();
      });
    });

    describe('when title not present', () => {
      it('does not render title', () => {
        render(<MediaCard />);
        expect(screen.queryByText(title)).not.toBeInTheDocument();
      });
    });

    describe('when description present', () => {
      it('renders description', () => {
        render(<MediaCard description={description} />);
        expect(screen.getByText(description)).toBeInTheDocument();
      });

      it('should maintain the card height on larger descriptions', () => {
        const { container: card1 } = render(<MediaCard description={description} />);
        const { container: card2 } = render(
          <MediaCard
            description={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor auctor lacus ac gravida. Integer maximus, justo vel cursus condimentum, nisi leo efficitur turpis, at congue justo metus eget neque.'
            }
          />
        );

        expect(card1.offsetHeight).toEqual(card2.offsetHeight);
      });
    });

    describe('when description not present', () => {
      it('does not render description', () => {
        render(<MediaCard />);
        expect(screen.queryByText(description)).not.toBeInTheDocument();
      });
    });
  });
});
