import type { RichContent } from '../../types';

import React from 'react';
import RichTranslation from '.';
import { render } from '@testing-library/react';

describe('<RichTranslation />', () => {
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
      <RichTranslation i18nKey="test" translator={jest.fn(() => mockStructuredTextResponse)} />
    );
  });
});
