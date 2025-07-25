/*
 * This function is used to generate all possible combinations of two sets of items.
 * Mathematically, it is known as the Cartesian product.
 * For example, if we have two sets of items:
 *   set1: [1, 2, 3]
 *   set2: [a, b, c]
 * The function will return all possible combinations of the two sets:
 *   [ [1, a], [1, b], [1, c], [2, a], [2, b], [2, c], [3, a], [3, b], [3, c] ]
 */
function getCrossPermutations<FirstOperandType, SecondOperandType>(
  set1: FirstOperandType[],
  set2: SecondOperandType[]
) {
  const result: [FirstOperandType, SecondOperandType][] = [];
  for (const set1Item of set1) {
    for (const set2Item of set2) {
      result.push([set1Item, set2Item]);
    }
  }
  return result;
}

export default getCrossPermutations;
