import type { Student } from '../../../../types';

import Cookie from 'js-cookie';

/**
 * Sets the client-side cookie for active learner to the given student UUID.
 * Includes a check for the student in the given list of students.
 */
function setActiveLearnerCookie(studentUuid: string, students: Student[] = []) {
  const learner = students?.find((student: Student) => student.uuid === studentUuid);

  // the cookie is the source of truth for the active learner across all our subdomains
  Cookie.set('active_learner_id', learner?.uuid ?? '', {
    domain: location.hostname.replace(/^[^.]*\.(.*)$/, '$1'),
    expires: 365,
    path: '/',
    sameSite: 'Lax',
  });

  // @deprecated: LocalStorage is still used in learning-discovery-ui
  localStorage.setItem('active_learner_id', learner?.uuid ?? '');

  // @deprecated: LocalStorage is still used in llt-lab-frontend
  localStorage.setItem('selected_student_id', learner?.uuid ?? '');

  return learner;
}

export default setActiveLearnerCookie;
