import * as index from '.';

describe('exports', () => {
  it.each(['fixtures'])(`%s`, (key) => {
    expect(index).toHaveProperty(key);
  });
});
