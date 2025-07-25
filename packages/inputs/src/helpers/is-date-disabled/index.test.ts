import isDateDisabled from '.';

const date = new Date('2000-01-01 08:00:00');

describe('isDateDisabled()', () => {
  it('should return false when date is enabled', () => {
    const enabledDates = [date];

    expect(isDateDisabled(date, enabledDates)).toBe(false);
  });

  it('should ignore times when comparing dates', () => {
    const enabledDates = [date];
    const enabledDate = new Date('2000-01-01 09:00:00');

    expect(isDateDisabled(enabledDate, enabledDates)).toBe(false);
  });

  it('should return false when enabledDates is empty', () => {
    const enabledDates = [];

    expect(isDateDisabled(date, enabledDates)).toBe(false);
  });

  it('should return true when date is disabled', () => {
    const enabledDates = [new Date('2000-01-02')];

    expect(isDateDisabled(date, enabledDates)).toBe(true);
  });
});
