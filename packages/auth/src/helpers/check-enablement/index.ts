import type { EnablementArg, Student } from '../../types';

import findEnablement from '../find-enablement';
import getAllEnablements from '../get-all-enablements';

interface CheckEnablementParams {
  enablement?: EnablementArg;
  students?: Student[];
}

function checkEnablement({ enablement, students }: CheckEnablementParams = {}) {
  // Do not block access if no enablement was given
  if (!enablement) {
    return true;
  }

  // Return early if there are no students to check enablements for
  if (!students?.length) {
    return false;
  }

  if (typeof enablement === 'function') {
    const allClientEnablements = getAllEnablements(students);

    return enablement(allClientEnablements);
  }

  // If we've reached this point, it's safe to assume that enablement is a string
  return Boolean(findEnablement({ enablementShortName: enablement as string, students }));
}

export default checkEnablement;
