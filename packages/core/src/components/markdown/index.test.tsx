import { render, screen } from '@testing-library/react';
import Markdown from '.';
import React from 'react';

describe('Markdown', () => {
  it('renders and markdown', () => {
    render(<Markdown>Test with *italics* and `code`</Markdown>);
    expect(screen.getByText('italics').tagName).toEqual('EM');
    expect(screen.getByText('code').tagName).toEqual('CODE');
  });
});
