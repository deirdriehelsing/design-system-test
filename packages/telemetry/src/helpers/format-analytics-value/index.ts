const MAX_LENGTHS = {
  // See: https://github.com/varsitytutors/llt-action-tracker/blob/master/schemas/pages/interaction/1-1-0.json
  action: 50,
  category: 50,
  label: 150,
  value: 100,
};

function formatAnalyticsValue(input: string, valueType: 'action' | 'category' | 'label' | 'value') {
  return (
    input
      .toLowerCase()
      .replace('&nbsp', '')
      // Removes HTML tags
      .replace(/<[^>]*>/g, '')
      // Removes punctuation
      .replace(/\W+/g, ' ')
      // Removes white space
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, MAX_LENGTHS[valueType] || input.length)
  );
}

export default formatAnalyticsValue;
