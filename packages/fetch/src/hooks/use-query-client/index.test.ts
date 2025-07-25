import { useQueryClient as reactQueryUseQueryClient } from '@tanstack/react-query';
import useQueryClient from '.';

describe('useQueryClient()', () => {
  it('returns the react-query useQueryClient hook', () => {
    expect(useQueryClient).toBe(reactQueryUseQueryClient);
  });
});
