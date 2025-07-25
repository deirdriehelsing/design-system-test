import type { FieldValues, FormState } from '../../types';

// From https://github.com/orgs/react-hook-form/discussions/1991#discussioncomment-6318535
function getDirtyFieldValues<
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  dirtyFields: FormState<FieldValues>['dirtyFields'],
  values: TFieldValues | TTransformedValues
): TFieldValues {
  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    // Unsure when RFH sets this to `false`, but omit the field if so.
    if (!dirtyFields[key]) {
      return prev;
    }

    return {
      ...prev,
      [key]:
        typeof dirtyFields[key] === 'object'
          ? getDirtyFieldValues(
              dirtyFields[key] as FormState<FieldValues>['dirtyFields'],
              values?.[key] as TFieldValues
            )
          : values?.[key],
    };
  }, {} as TFieldValues);

  return dirtyValues;
}

export default getDirtyFieldValues;
