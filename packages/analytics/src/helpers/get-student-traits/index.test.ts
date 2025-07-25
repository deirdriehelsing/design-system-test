import type { Student } from '@blueshift-ui/core';

import { fixtures } from '@blueshift-ui/testing-fixtures';
import getStudentTraits from '.';

describe('getStudentTraits()', () => {
  it('extracts all student traits correctly', () => {
    const result = getStudentTraits(
      fixtures.authenticatedUser.vt4sClient.students[0] as unknown as Student
    );

    expect(result).toEqual({
      email: 'sally.nova@fairfaxtesting.com',
      enablements: [
        'academic_video_on_demand',
        'vt+_courses',
        'summer_offering_courses',
        'instant_chat',
        'academic_video_on_demand',
        'essay_editing',
        'merchandising_banner',
        'uxp_enabled',
        'live_classes',
      ],
      first_name: 'Sally',
      grade_id: 14,
      last_name: 'Nova',
      user_id: 's16hwvZMZ_2rUi3IhXTLmQ',
      uuid: '24b15304-b64a-4010-9102-80f6beab01d8',
    });
  });

  it('handles a student without enablements', () => {
    const result = getStudentTraits(
      fixtures.authenticatedUser.membershipClient.students[0] as unknown as Student
    );

    expect(result).toEqual({
      email: undefined,
      enablements: [],
      first_name: 'Buzz',
      grade_id: 1,
      last_name: 'Aldrin',
      user_id: 'mock-student-user-id',
      uuid: 'mock-student-uuid',
    });
  });
});
