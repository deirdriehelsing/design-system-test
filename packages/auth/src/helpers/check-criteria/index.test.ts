import type { FeatureAccessOptions, Student } from '../../types';

import checkCriteria from '.';

describe('checkCriteria()', () => {
  const mockProductState = 'tutoring' as const;
  const mockRole = 'student' as const;
  const mockStudents: Student[] = [
    {
      uuid: 'mock-student-id',
      user_id: '1',
      enrolled: true,
      first_name: '',
      grade_list_id: 1,
      last_name: '',
      student_user_id: '1',
    },
    {
      uuid: 'mock-student-id-2',
      user_id: '2',
      enrolled: true,
      first_name: '',
      grade_list_id: 1,
      last_name: '',
      student_user_id: '2',
      enablements: [{ product: { short_name: 'some_enablement' } }],
    },
  ];
  const mockFlagClient = { variation: (flag: string) => flag === 'mock-flag' } as any;
  const userValues = {
    flagClient: mockFlagClient,
    students: mockStudents,
    userProductState: mockProductState,
    userRole: mockRole,
  };

  it('supports one criteria match', () => {
    expect(checkCriteria(userValues, { enablement: 'some_enablement' })).toBe(true);
    expect(checkCriteria(userValues, { flag: 'mock-flag' })).toBe(true);
    expect(checkCriteria(userValues, { productState: mockProductState })).toBe(true);
    expect(checkCriteria(userValues, { role: mockRole })).toBe(true);

    expect(checkCriteria(userValues, { enablement: 'incorrect_enablement' })).toBe(false);
    expect(checkCriteria(userValues, { flag: 'incorrect-flag' })).toBe(false);
    expect(checkCriteria(userValues, { productState: 'vt4s' })).toBe(false);
    expect(checkCriteria(userValues, { role: 'tutor' })).toBe(false);
  });

  it('supports every criteria match', () => {
    const everyMatchCriteria: FeatureAccessOptions = {
      every: [
        { enablement: 'some_enablement' },
        { flag: 'mock-flag' },
        { productState: mockProductState },
        { role: mockRole },
      ],
    };

    const notEveryMatchCriteria: FeatureAccessOptions = {
      every: [
        { enablement: 'some_enablement' },
        { flag: 'incorrect-flag' }, // <--- This will fail
        { productState: mockProductState },
        { role: mockRole },
      ],
    };

    expect(checkCriteria(userValues, everyMatchCriteria)).toBe(true);
    expect(checkCriteria(userValues, notEveryMatchCriteria)).toBe(false);
  });

  it('supports some criteria match', () => {
    const someMatchCriteria: FeatureAccessOptions = {
      some: [
        { enablement: 'incorrect_enablement' },
        { flag: 'incorrect-flag' },
        { productState: mockProductState }, // <--- This will match, others will not
        { role: 'tutor' },
      ],
    };

    const noneMatchCriteria: FeatureAccessOptions = {
      some: [
        { enablement: 'incorrect_enablement' },
        { flag: 'incorrect-flag' },
        { productState: 'vt4s' },
        { role: 'tutor' },
      ],
    };

    expect(checkCriteria(userValues, someMatchCriteria)).toBe(true);
    expect(checkCriteria(userValues, noneMatchCriteria)).toBe(false);
  });

  it('supports nesting of conditions', () => {
    const criteria: FeatureAccessOptions = {
      every: [
        { enablement: 'some_enablement' },
        { some: [{ flag: 'incorrect-flag' }, { productState: mockProductState }] },
        { role: mockRole },
      ],
    };

    expect(checkCriteria(userValues, criteria)).toBe(true);
  });

  it('supports empty array criteria', () => {
    expect(checkCriteria({}, { some: [] })).toBe(false);
    expect(checkCriteria({}, { every: [] })).toBe(true);
  });

  it('supports boolean criteria', () => {
    expect(checkCriteria({}, { every: [true, true, true] })).toBe(true);
    expect(checkCriteria({}, { every: [true, false, true] })).toBe(false);
    expect(checkCriteria({}, true)).toBe(true);
    expect(checkCriteria({}, false)).toBe(false);
  });
});
