import type { AuthenticatedUserResponse } from '@blueshift-ui/core';

import { fixtures } from '@blueshift-ui/testing-fixtures';
import getUserTraits from '.';

describe('getUserTraits()', () => {
  it('should extract user traits from signed in freemium client', () => {
    const traits = getUserTraits(
      fixtures.authenticatedUser.freemiumClient as unknown as AuthenticatedUserResponse
    );

    expect(traits).toEqual({
      email: 'freemium-staging-user@vt.com',
      first_name: 'Freemium',
      id: 1054236191,
      jurisdiction_id: 10,
      last_name: 'User',
      product_state: 'free_class',
      role: 'client',
      role_id: 2898907,
      role_uuid: '7310ed83-419a-4289-9203-e9320200eb55',
      sales_group_ids: undefined,
      students: expect.arrayContaining([
        {
          email: 'freemium-staging-user@vt.com',
          enablements: [],
          first_name: 'Freemium',
          grade_id: 20,
          last_name: '',
          user_id: '0cpRQxFW1j1ZASbVSEoO1Q',
          uuid: '92a8b9c8-a2b0-49c0-bfac-760189d81622',
        },
        {
          email: '',
          enablements: [],
          first_name: 'Jose',
          grade_id: 10,
          last_name: 'Galisteo',
          user_id: '0cpRQxFW1j1ZASbVSEoO1Q',
          uuid: '3290eb8e-fa5b-415e-81e9-ad1d7bca91ca',
        },
      ]),
      user_id: '0cpRQxFW1j1ZASbVSEoO1Q',
    });
  });

  it('should extract user traits from signed in membership client', () => {
    const traits = getUserTraits(
      fixtures.authenticatedUser.membershipClient as unknown as AuthenticatedUserResponse
    );

    expect(traits).toEqual({
      email: 'tt-prepare-for-your-session@vtstaging.xyz',
      first_name: 'PrepareForYourSession',
      id: 1054958434,
      jurisdiction_id: 7,
      last_name: 'TutorTracker',
      product_state: 'one_on_one_membership',
      role: 'client',
      role_id: 3251604,
      role_uuid: '89426602-d58e-46db-92fd-784b62945925',
      sales_group_ids: undefined,
      students: [
        {
          email: undefined,
          enablements: [],
          first_name: 'Buzz',
          grade_id: 1,
          last_name: 'Aldrin',
          user_id: 'mock-student-user-id',
          uuid: 'mock-student-uuid',
        },
      ],
      user_id: 'raNIdqI9EWDrBwhbbPyvYA',
    });
  });

  it('should extract user traits from signed in tutor', () => {
    const traits = getUserTraits(
      fixtures.authenticatedUser.tutor as unknown as AuthenticatedUserResponse
    );

    expect(traits).toEqual({
      email: 'gui.tutor@vt.com',
      first_name: 'Gui',
      id: 1054698699,
      jurisdiction_id: 7,
      last_name: 'Tutor',
      product_state: null,
      role: 'tutor',
      role_id: 879571128,
      role_uuid: 'e47c169b-20c7-4de4-8508-b99e6483ba84',
      sales_group_ids: undefined,
      students: expect.arrayContaining([
        {
          email: null,
          enablements: [],
          first_name: null,
          grade_id: null,
          last_name: null,
          user_id: null,
          uuid: '99b0134f-6386-4a33-b4a1-47898a8bb2f4',
        },
        {
          email: null,
          enablements: [],
          first_name: null,
          grade_id: null,
          last_name: null,
          user_id: null,
          uuid: '451f0853-05c9-4414-85bc-abc29f473409',
        },
      ]),
      user_id: 'wlu-V5y-2vg31Y42hlun5Q',
    });
  });

  it('should extract user traits from signed in VT4S client', () => {
    const traits = getUserTraits(
      fixtures.authenticatedUser.vt4sClient as unknown as AuthenticatedUserResponse
    );

    expect(traits).toEqual({
      email: 'super.nova@fairfaxtesting.com',
      first_name: 'Super',
      id: 1054487410,
      jurisdiction_id: 42,
      last_name: 'Nova',
      product_state: 'vt4s',
      role: 'client',
      role_id: 3023412,
      role_uuid: '7eb8d07e-5a2d-4a11-940e-29620d453776',
      sales_group_ids: undefined,
      students: [
        {
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
        },
        {
          email: 'super.nova@fairfaxtesting.com',
          enablements: [],
          first_name: 'Leigh ',
          grade_id: 14,
          last_name: 'Nova',
          user_id: 's16hwvZMZ_2rUi3IhXTLmQ',
          uuid: 'e6abfadb-e293-48a9-9e44-589b4fb8ea09',
        },
      ],
      user_id: 's16hwvZMZ_2rUi3IhXTLmQ',
    });
  });

  it('should extract user traits from signed in VT4S student', () => {
    const traits = getUserTraits(
      fixtures.authenticatedUser.vt4sStudent as unknown as AuthenticatedUserResponse
    );

    expect(traits).toEqual({
      email: 'sally.nova@fairfaxtesting.com',
      first_name: 'Sally',
      id: 1054487411,
      jurisdiction_id: 42,
      last_name: 'Nova',
      product_state: 'vt4s',
      role: 'student',
      role_id: 1054487411,
      role_uuid: '24b15304-b64a-4010-9102-80f6beab01d8',
      sales_group_ids: undefined,
      students: [
        {
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
        },
      ],
      user_id: 'w57ascEOw26YoDuLmzAJlQ',
    });
  });

  it('should return undefined if no user is signed in', () => {
    const traits = getUserTraits();

    expect(traits).toBeUndefined();
  });

  it('should handle undefined students array', () => {
    const traits = getUserTraits({
      ...(fixtures.authenticatedUser.membershipClient as unknown as AuthenticatedUserResponse),
      students: undefined,
    });

    expect(traits).toEqual({
      email: 'tt-prepare-for-your-session@vtstaging.xyz',
      first_name: 'PrepareForYourSession',
      id: 1054958434,
      jurisdiction_id: 7,
      last_name: 'TutorTracker',
      product_state: 'one_on_one_membership',
      role: 'client',
      role_id: 3251604,
      role_uuid: '89426602-d58e-46db-92fd-784b62945925',
      sales_group_ids: undefined,
      students: [],
      user_id: 'raNIdqI9EWDrBwhbbPyvYA',
    });
  });
});
