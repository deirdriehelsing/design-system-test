import { render, screen } from '@testing-library/react';
import React from 'react';
import StepperSummaryItem from '.';
import StepperSummaryItemData from '../stepper-summary-item-data';
import StepperSummaryItemDescription from '../stepper-summary-item-description';
import StepperSummaryItemLabel from '../stepper-summary-item-label';
import userEvent from '@testing-library/user-event';

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));

const MOCK_PROPS = {
  icon: <samp>mock-icon</samp>,
};

describe('<StepperSummaryItem />', () => {
  it('renders', () => {
    render(
      <StepperSummaryItem {...MOCK_PROPS}>
        <StepperSummaryItemLabel>mock-label</StepperSummaryItemLabel>
        <StepperSummaryItemData labelledby="mock-label">mock-data</StepperSummaryItemData>
        <StepperSummaryItemDescription labelledby="mock-label">
          mock-description
        </StepperSummaryItemDescription>
      </StepperSummaryItem>
    );

    expect(screen.getByText('mock-icon')).toBeVisible();
    expect(screen.getByLabelText('mock-label')).toBeVisible();
    expect(screen.getByText('mock-data')).toBeVisible();
    expect(screen.getByText('mock-description')).toBeVisible();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const onEdit = jest.fn();
    const user = userEvent.setup();
    render(
      <StepperSummaryItem {...MOCK_PROPS} onEdit={onEdit}>
        <StepperSummaryItemLabel>mock-label</StepperSummaryItemLabel>
        <StepperSummaryItemData>mock-data</StepperSummaryItemData>
        <StepperSummaryItemDescription>mock-description</StepperSummaryItemDescription>
      </StepperSummaryItem>
    );
    const editButton = screen.getByRole('button', { name: 'stepper_summary_item_edit_label' });
    await user.click(editButton);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ target: editButton }));
  });

  it('styles icon with iconColor', () => {
    render(<StepperSummaryItem {...MOCK_PROPS} iconColor="mock" />);

    expect(screen.getByText('mock-icon')).toHaveStyle('color: mock');
  });
});
