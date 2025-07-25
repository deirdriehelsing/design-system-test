import * as exports from '.';

describe('component index', () => {
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
    'DateRangeFilterMenu',
    'DateRangePicker',
    'FilterMenu',
    'RadioButtonGroup',
    'Rating',
    'Select',
    'TextArea',
    'TextField',
  ])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
