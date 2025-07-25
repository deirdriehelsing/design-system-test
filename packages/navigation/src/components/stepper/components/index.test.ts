import * as exports from '.';

describe('component index', () => {
  describe.each([
    'Step',
    'StepButton',
    'StepIndicator',
    'Stepper',
    'StepperSummary',
    'StepperSummaryItem',
    'StepperSummaryItemData',
    'StepperSummaryItemDescription',
    'StepperSummaryItemLabel',
  ])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
