import type { Student } from '../../../../types';

import Cookie from 'js-cookie';
import setActiveLearnerCookie from '../set-active-learner-cookie';

/**
 * Returns the active learner from the given list of students.
 */
function findActiveLearner(students: Student[] = []) {
  const studentUuid =
    Cookie.get('active_learner_id') || localStorage.getItem('active_learner_id') || '';

  const learner = students.find((student: Student) => student.uuid === studentUuid);

  // reset cookie if the active learner is not found, for example if we have changed account
  if (studentUuid && !learner) {
    setActiveLearnerCookie('', students);
  }

  return learner;
}

export default findActiveLearner;
