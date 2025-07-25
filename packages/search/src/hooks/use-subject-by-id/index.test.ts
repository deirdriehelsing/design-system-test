import { renderHook } from '@testing-library/react';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';
import useSubjectById from '.';

const mockedSubject = {
  _index: 'catalog-items-v1',
  _type: '_doc',
  _id: 'b78c3d6e-63dc-4665-9a59-5a325d7b34ca',
  _score: 1.0,
  _source: {
    type: 'subject',
    id: 'b78c3d6e-63dc-4665-9a59-5a325d7b34ca',
    name: '2nd Grade Math',
    title: '2nd Grade Math',
    title_formatted: '2nd Grade Math',
    description:
      'Master 2nd grade math with the help of expert tutors and instructors, interactive practice problems, and on-demand study resources.  Includes: Fractions & Decimals, Geometry, Algebra, and more.',
    slug: 'elementary_school_math',
    parent: 'Elementary School',
    category: 'Elementary School',
    grade_full_range: 'Grades 2-4',
    has_detail_page: true,
    instant_tutoring_enabled: true,
    images: {
      hero: {
        path: 'https://llt.imgix.net/v1/1652975052-star-south-carolina-aquarium-9-hero.jpg',
        options: null,
        responsive_paths: {
          '1x': 'https://llt.imgix.net/v1/1652975052-star-south-carolina-aquarium-9-hero.jpg?fit=crop&ar=16:9&w=336',
          '2x': 'https://llt.imgix.net/v1/1652975052-star-south-carolina-aquarium-9-hero.jpg?fit=crop&ar=16:9&w=672',
        },
        properties: null,
      },
      hero_mobile: {
        path: '',
        options: null,
        responsive_paths: null,
        properties: null,
      },
      product: {
        path: '',
        options: null,
        responsive_paths: null,
        properties: null,
      },
    },
  },
};

const mockedUseData = useData as jest.Mock;

jest.mock('@blueshift-ui/fetch/dist/hooks/use-data');

describe('useSubjectById()', () => {
  beforeEach(() => {
    mockedUseData.mockReturnValue({
      data: mockedSubject,
      isLoading: false,
    });

    mockedUseData.mockClear();
  });

  it.each([
    { id: 123, enabled: true },
    { id: undefined, enabled: false },
  ])('enabled is $enabled when given id is $id', ({ id, enabled }) => {
    renderHook(() => useSubjectById(id));

    expect(mockedUseData).toHaveBeenCalledTimes(1);
    expect(mockedUseData).toHaveBeenCalledWith(
      expect.objectContaining({
        queryOptions: expect.objectContaining({
          enabled,
        }),
      })
    );
  });

  it('returns subject from response', () => {
    const { result } = renderHook(() => useSubjectById(123));

    const [{ queryOptions }] = mockedUseData.mock.calls[0];

    expect(
      queryOptions.select({
        hits: {
          hits: [
            {
              _source: mockedSubject,
            },
          ],
        },
      })
    ).toBe(mockedSubject);

    expect(result.current.subject).toBe(mockedSubject);
  });
});
