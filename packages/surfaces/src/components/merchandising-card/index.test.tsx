import { render, screen } from '@testing-library/react';
import Button from '@blueshift-ui/core/dist/components/button';
import MerchandisingCard from '.';
import React from 'react';

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

describe('<MerchandisingCard />', () => {
  const action = <Button name="laborum">laborum</Button>;
  const image = 'student.png';
  const headline = 'Excepteur sint occaecat cupidatat';
  const pitch = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  it('renders action', () => {
    render(<MerchandisingCard action={action} headline={headline} />);

    const actionButton = screen.getByRole('button', { name: 'laborum' });

    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toBeVisible();
  });

  it('renders headline', async () => {
    render(<MerchandisingCard action={action} headline={headline} />);

    const cardHeadline = await screen.findByText(headline);

    expect(cardHeadline).toBeInTheDocument();
    expect(cardHeadline).toBeVisible();
  });

  it('renders image', () => {
    render(<MerchandisingCard action={action} headline={headline} image={image} />);

    const cardImage = screen.getByRole('presentation');

    expect(cardImage).toBeInTheDocument();
  });

  it('renders simple text pitch', async () => {
    render(<MerchandisingCard action={action} headline={headline} pitch={pitch} />);

    const cardPitch = await screen.findByText(pitch);

    expect(cardPitch).toBeInTheDocument();
    expect(cardPitch).toBeVisible();
  });

  it('renders rich text pitch', async () => {
    render(
      <MerchandisingCard
        action={action}
        headline={headline}
        pitch={{
          value: {
            schema: 'dast',
            document: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'span',
                      value: 'Lorem ipsum dolor sit amet, ',
                    },
                    {
                      type: 'span',
                      marks: ['strong'],
                      value: 'consectetur adipiscing elit',
                    },
                    {
                      type: 'span',
                      value: '. Nunc vulputate libero et velit.',
                    },
                  ],
                },
              ],
            },
          },
        }}
      />
    );

    const cardPitch = await screen.findByText((text) =>
      text.startsWith('Lorem ipsum dolor sit amet, ')
    );

    expect(cardPitch).toBeInTheDocument();
    expect(cardPitch).toBeVisible();
    expect(cardPitch).toContainHTML(
      '<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Nunc vulputate libero et velit.</p>'
    );
  });
});
