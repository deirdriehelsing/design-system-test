import generateBlobBorderRadius from '.';

describe('generateBlobBorderRadius()', () => {
  it('generates a border radius value within a defined range', () => {
    const borderRadius = generateBlobBorderRadius({ range: [10, 50] });
    borderRadius
      .replace(/[\n/%]/g, '')
      .split(' ')
      .forEach((value) => {
        if (!value) {
          return;
        }

        const radius = parseInt(value, 10);
        expect((radius >= 10 && radius <= 50) || (radius >= 50 && radius <= 90)).toBe(true);
      });
  });
});
