import type { Enablement, Student } from '../../types';

import getAllEnablements from '../get-all-enablements';

interface FindEnablementParams {
  enablementShortName: string;
  students?: Student[];
}

/**
 * Find the first enablement for a given short name.
 * @description This is used to determine if a client has access to a feature. Enablements are
 *  defined at the student, not client, level. We need to grant feature access to all students under
 *  a client if any of them have the enablement.
 */
function findEnablement({
  enablementShortName,
  students = [],
}: FindEnablementParams): Enablement | null {
  if (!students?.length) {
    return null;
  }

  return (
    getAllEnablements(students).find(
      ({ product }) => product?.short_name === enablementShortName
    ) ?? null
  );
}

export default findEnablement;
