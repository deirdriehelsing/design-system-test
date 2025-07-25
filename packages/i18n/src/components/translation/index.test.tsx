import React from 'react';
import Translation from '.';
import { render } from '@testing-library/react';

jest.mock('react-i18next', () => ({ Trans: () => <samp /> }));

describe('<Translation />', () => {
  it('renders', () => {
    render(
      <Translation
        i18nKey="test"
        replace={{ components: [<button key="mock-replacement" />] }}
        translator={() => 'mock-translation <0>mock-replacement-placeholder</0>'}
      />
    );
  });
});
