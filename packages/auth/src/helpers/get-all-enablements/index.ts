import type { Enablement, Student } from '../../types';

interface GetAllEnablementsOptions {
  unique?: boolean;
}

/**
 * Get all enablements for a given list of students.
 */
function getAllEnablements(
  students: Student[] | undefined = [],
  options: GetAllEnablementsOptions = {}
): Enablement[] {
  if (!students?.length) {
    return [];
  }

  const enablements = students.flatMap(({ enablements }) => enablements ?? []);

  if (options.unique) {
    return Array.from(new Set(enablements));
  }

  return enablements;
}

export default getAllEnablements;
