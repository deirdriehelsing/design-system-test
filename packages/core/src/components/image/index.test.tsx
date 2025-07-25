import { render, screen, waitFor } from '@testing-library/react';
import Image from '.';
import React from 'react';

jest.mock('../skeleton', () => (props: any) => <div data-testid="skeleton" {...props} />);

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

describe('<Image />', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
    width: 100,
    height: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    Object.defineProperty(global.Image.prototype, 'complete', {
      get() {
        return false;
      },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Skeleton initially when image is not complete', () => {
    render(<Image {...defaultProps} />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('does not render Skeleton when image is already complete', () => {
    Object.defineProperty(global.Image.prototype, 'complete', {
      get() {
        return true;
      },
    });

    render(<Image {...defaultProps} />);

    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('removes Skeleton after image load', async () => {
    render(<Image {...defaultProps} />);

    const imgElement = screen.getByAltText('Test image');

    imgElement.dispatchEvent(new Event('load'));

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    });
  });

  it('sets image src immediately when loading is eager', () => {
    render(<Image {...defaultProps} loading="eager" />);

    const imgElement = screen.getByAltText('Test image');
    expect(imgElement).toHaveAttribute('src', defaultProps.src);
  });

  it('sets image src when intersecting for lazy loading', async () => {
    render(<Image {...defaultProps} loading="lazy" />);

    const imgElement = screen.getByAltText('Test image');
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('data:image/gif;base64'));

    jest.runAllTimers();

    await waitFor(() => {
      expect(imgElement).toHaveAttribute('src', defaultProps.src);
    });
  });

  it('sets background image when intersecting for lazy loading', async () => {
    const imgSource = 'https://example.com/image.jpg';
    render(
      <Image
        {...defaultProps}
        loading="lazy"
        src={undefined}
        style={{ backgroundImage: `url(${imgSource})` }}
      />
    );

    const imgElement = screen.getByAltText('Test image');
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('data:image/gif;base64'));
    expect(imgElement).not.toHaveAttribute(
      'style',
      expect.stringContaining('background-image: url(')
    );

    jest.runAllTimers();

    await waitFor(() => {
      expect(imgElement).toHaveAttribute('src', expect.stringContaining('data:image/gif;base64'));
    });

    await waitFor(() => {
      expect(imgElement).toHaveAttribute(
        'style',
        expect.stringContaining('background-image: url(')
      );
    });
  });
});
