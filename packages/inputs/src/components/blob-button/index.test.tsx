import { render, screen } from '@testing-library/react';
import BlobButton from '.';
import React from 'react';

describe('<BlobButton />', () => {
  it('renders horizontal variant correctly', () => {
    const { container } = render(<BlobButton icon={<svg>Icon</svg>}>Test</BlobButton>);

    expect(screen.getByText('Icon')).toBeVisible();
    expect(screen.getByText('Test')).toBeVisible();

    expect(container.firstChild).toHaveClass('MuiButton-blob MuiButton-blobSizeMedium');
  });

  it('renders stacked variant correctly', () => {
    const { container } = render(
      <BlobButton icon={<svg>Icon</svg>} orientation="stacked">
        Test
      </BlobButton>
    );

    expect(screen.getByText('Icon')).toBeVisible();
    expect(screen.getByText('Test')).toBeVisible();
    expect(container.firstChild).toHaveAttribute('data-orientation', 'stacked');
  });

  it('renders small sized button correctly', () => {
    const { container } = render(
      <BlobButton icon={<svg>Icon</svg>} size="small">
        Test
      </BlobButton>
    );

    expect(screen.getByText('Icon')).toBeVisible();
    expect(screen.getByText('Test')).toBeVisible();
    expect(container.firstChild).toHaveClass('MuiButton-blob MuiButton-blobSizeSmall');
  });

  it('renders small stacked button correctly', () => {
    const { container } = render(
      <BlobButton icon={<svg>Icon</svg>} orientation="stacked" size="small">
        Test
      </BlobButton>
    );

    expect(screen.getByText('Icon')).toBeVisible();
    expect(screen.getByText('Test')).toBeVisible();
    expect(container.firstChild).toHaveAttribute('data-orientation', 'stacked');
    expect(container.firstChild).toHaveClass('MuiButton-blob MuiButton-blobSizeSmall');
  });
});
