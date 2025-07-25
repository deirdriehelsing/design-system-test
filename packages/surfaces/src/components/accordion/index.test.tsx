import { render, screen } from '@testing-library/react';
import Accordion from '.';
import React from 'react';

describe('<Accordion />', () => {
  describe('when title is a boolean', () => {
    it('renders', async () => {
      render(<Accordion title={true}>Content</Accordion>);
      expect(await screen.findByText(/true/)).toBeVisible();
    });
  });

  describe('when title is a number', () => {
    it('renders', async () => {
      render(<Accordion title={1337}>Content</Accordion>);
      expect(await screen.findByText(/1337/)).toBeVisible();
    });
  });

  describe('when title is a string', () => {
    it('renders', async () => {
      render(<Accordion title="Title">Content</Accordion>);
      expect(await screen.findByText(/Title/)).toBeVisible();
    });
  });

  describe('when title is a React node', () => {
    it('renders', async () => {
      const Foo = () => <span>Foo!</span>;
      render(<Accordion title={<Foo />}>Content</Accordion>);
      expect(await screen.findByText(/Foo!/)).toBeVisible();
    });
  });
});
