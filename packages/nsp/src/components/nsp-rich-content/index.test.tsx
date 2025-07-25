import type { RichContent } from '../../types';

import { render, screen } from '@testing-library/react';
import NspRichContent from '.';
import React from 'react';

describe('<RichContent />', () => {
  const mockStructuredTextResponse: RichContent = {
    value: {
      schema: 'dast',
      document: {
        type: 'root',
        children: [
          {
            type: 'heading',
            level: 1,
            children: [
              { type: 'span', value: 'This\nis a ' },
              { type: 'span', marks: ['strong'], value: 'mock' },
            ],
          },
        ],
      },
    },
  };

  it('renders', () => {
    render(
      <div id="nsp-rich-content">
        <NspRichContent data={mockStructuredTextResponse} />
      </div>
    );

    const nspRichContent = screen.getByRole('heading');

    expect(nspRichContent).toContainHTML('<h1>This<br>is a <strong>mock</strong></h1>');
  });
});
