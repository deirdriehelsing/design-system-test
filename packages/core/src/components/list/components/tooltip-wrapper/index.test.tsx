import { render, screen } from '@testing-library/react';
import React from 'react';
import TooltipWrapper from '.';

jest.mock('../../../tooltip', () => ({ children }) => (
  <>
    <div>Tooltip</div>
    <div>{children}</div>
  </>
));

describe('<TooltipWrapper />', () => {
  it('renders tooltip with title', () => {
    render(
      <TooltipWrapper title="Tooltip">
        <>Content</>
      </TooltipWrapper>
    );

    expect(screen.getByText('Tooltip')).toBeVisible();
    expect(screen.getByText('Content')).toBeVisible();
  });

  it('renders children without title', () => {
    render(
      <TooltipWrapper>
        <>Content</>
      </TooltipWrapper>
    );

    expect(screen.queryByText('Tooltip')).not.toBeInTheDocument();
    expect(screen.getByText('Content')).toBeVisible();
  });
});
