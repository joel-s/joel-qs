/**
 * Return a copy of the `qs` array sorted by `field`.
 * If 'asccending', sort in ascending order.
 */
export function sortQs(qs, field, ascending) {
  var sortedQs = [...qs];   // clone the array
  const order = ascending ? 1 : -1;

  sortedQs.sort((a, b) =>
    a[field] === b[field] ? 0 : (a[field] > b[field] ? order : -order));

  return sortedQs;
}

/**
 *
 */
