import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Tabs from '.';
import userEvent from '@testing-library/user-event';

const mockTabs = [
  {
    label: 'Tab 1',
    component: <span>Tab 1 Content</span>,
  },
  {
    label: 'Tab 2',
    component: 'Tab 2 Content',
  },
];

describe('tabs', () => {
  it('renders TabComponent with tabs and content', () => {
    render(<Tabs tabs={mockTabs} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();
  });

  it('switches between tabs when clicked', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={mockTabs} />);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    await user.click(tab2);

    await waitFor(() => {
      expect(tab1).toHaveAttribute('aria-selected', 'false');
    });

    await waitFor(() => {
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    expect(await screen.findByText('Tab 2 Content')).toBeVisible();
    expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
  });

  describe('controlled behavior', () => {
    it('renders the selected tab based on value prop', () => {
      const { rerender } = render(<Tabs onChange={jest.fn()} tabs={mockTabs} value={1} />);

      expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
      expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();

      rerender(<Tabs onChange={jest.fn()} tabs={mockTabs} value={0} />);
      expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
      expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();
    });

    it('calls onChange when a tab is clicked but does not change tab unless value prop changes', async () => {
      const user = userEvent.setup();

      const handleChange = jest.fn();
      const { rerender } = render(<Tabs onChange={handleChange} tabs={mockTabs} value={0} />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 1);

      expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
      expect(screen.queryByText('Tab 2 Content')).not.toBeInTheDocument();

      rerender(<Tabs onChange={handleChange} tabs={mockTabs} value={1} />);

      expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
      expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
    });
  });
});
