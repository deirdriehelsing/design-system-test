import type { Student } from '@blueshift-ui/core';
import type { StudentTraits } from '../../types';

/**
 * Get the analytics traits for a student.
 * @param student - The student to get the analytics traits for.
 * @returns The analytics traits for the student.
 */
function getStudentTraits(student: Student): StudentTraits {
  return {
    email: student.email,
    enablements: student.enablements?.map((enablement) => enablement.product.short_name) ?? [],
    first_name: student.first_name,
    grade_id: student.grade_list_id,
    last_name: student.last_name,
    user_id: student.user_id,
    uuid: student.uuid,
  };
}

export default getStudentTraits;
