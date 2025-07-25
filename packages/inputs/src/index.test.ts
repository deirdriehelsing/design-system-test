import * as exports from '.';

describe('package index', () => {
  describe.each([
    'ActionButton',
    'AsyncActionButton',
    'Autocomplete',
    'AutocompleteWithExternalTags',
    'BlobButton',
    'CardInputOption',
    'Checkbox',
    'CopyButton',
    'DateCalendar',
    'DateCalendarSkeleton',
    'DatePicker',
    'DateRangePicker',
    'FilterMenu',
    'RadioButtonGroup',
    'Rating',
    'Select',
    'TextArea',
    'TextField',
    'isDateDisabled',
    'useControlledValue',
  ])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
