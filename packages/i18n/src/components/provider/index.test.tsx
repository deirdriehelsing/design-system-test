import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import I18nProvider from '.';
import { i18next } from '../../lib/i18next/config';

describe('<I18nProvider />', () => {
  it('renders', () => {
    render(<I18nProvider />);
  });

  it.each([false, true])('handles initialization when suspense is %s', (suspense) => {
    i18next.isInitialized = false;

    render(
      <Suspense fallback={<div>Loading...</div>}>
        <I18nProvider suspense={suspense}>
          <div>Children</div>
        </I18nProvider>
      </Suspense>
    );

    if (suspense) {
      expect(screen.queryByText('Children')).toBeNull();
      expect(screen.getByText('Loading...')).toBeInstanceOf(Element);
    } else {
      expect(screen.queryByText('Children')).toBeInstanceOf(Element);
      expect(screen.queryByText('Loading...')).toBeNull();
    }
  });
});
