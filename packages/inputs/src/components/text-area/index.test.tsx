import React from 'react';
import TextArea from '.';
import { render } from '@testing-library/react';

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));

describe('<TextArea />', () => {
  it('renders', () => {
    render(<TextArea />);
  });
});
