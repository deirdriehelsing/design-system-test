function parseFilters(filters: Record<string, any>) {
  return Object.entries(filters).reduce<Record<string, any>[]>((accumulator, [key, value]) => {
    if (key === 'exists') {
      return [
        ...accumulator,
        // This patterns makes it support either a single value or an array of values
        ...[value].flatMap((field) => ({
          exists: {
            field,
          },
        })),
      ];
    }

    return [
      ...accumulator,
      {
        term: {
          [key]: value,
        },
      },
    ];
  }, []);
}

export default parseFilters;
