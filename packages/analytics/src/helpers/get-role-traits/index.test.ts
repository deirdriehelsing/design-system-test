import type { AuthenticatedUser } from '@blueshift-ui/core';

import getRoleTraits from '.';

describe('getRoleTraits()', () => {
  it('returns the correct role traits for a client user', () => {
    const mockClientUser = {
      role: 'client',
      client_id: 123,
      client_uuid: 'client-uuid-123',
      id: 456,
    } as AuthenticatedUser;

    const result = getRoleTraits(mockClientUser);

    expect(result).toEqual({
      role_id: 123,
      role_uuid: 'client-uuid-123',
    });
  });

  it('returns the correct role traits for a student user with students array', () => {
    const mockStudentUser: AuthenticatedUser = {
      role: 'student',
      client_id: 123,
      client_uuid: 'client-uuid-123',
      id: 456,
      user_id: 'user-uuid-456',
      students: [
        {
          id: 789,
          uuid: 'student-uuid-789',
          student_user_id: 'student-user-id-789',
          user_id: 'user-id-789',
        },
      ],
    } as AuthenticatedUser;

    const result = getRoleTraits(mockStudentUser);

    expect(result).toEqual({
      role_id: 789,
      role_uuid: 'student-uuid-789',
    });
  });

  it('returns the fallback role traits for a student user without students array', () => {
    const mockStudentUser: AuthenticatedUser = {
      role: 'student',
      client_id: 123,
      client_uuid: 'client-uuid-123',
      id: 456,
      user_id: 'user-uuid-456',
      students: undefined,
    } as AuthenticatedUser;

    const result = getRoleTraits(mockStudentUser);

    expect(result).toEqual({
      role_id: 456,
      role_uuid: 'user-uuid-456',
    });
  });

  it('returns the correct role traits for a tutor user', () => {
    const mockTutorUser = {
      role: 'tutor',
      client_id: 123,
      client_uuid: 'client-uuid-123',
      id: 456,
      tutor_id: 789,
      tutor_uuid: 'tutor-uuid-789',
    } as AuthenticatedUser;

    const result = getRoleTraits(mockTutorUser);

    expect(result).toEqual({
      role_id: 789,
      role_uuid: 'tutor-uuid-789',
    });
  });

  it('returns the correct role traits for a user with a generic role', () => {
    const mockUser = {
      id: 123,
      role: 'mock-role',
      user_id: 'user-uuid-123',
    } as unknown as AuthenticatedUser;

    const result = getRoleTraits(mockUser);

    expect(result).toEqual({
      role_id: 123,
      role_uuid: 'user-uuid-123',
    });
  });
});
