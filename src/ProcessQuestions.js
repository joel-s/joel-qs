/**
 * Retrun all the elements in `qs` that contain `string`.
 * Comparison is case-insensitive.
 */
export function filterQs(qs, string) {
  if (string === null || string === undefined || string === "") {
    return qs;
  }

  return qs.filter(obj =>
    caseInsensitiveContains(obj.question, string) ||
    caseInsensitiveContains(obj.answer, string) ||
    caseInsensitiveContains(obj.distractors, string)
  );
}

/**
 * Retrun `true` iff `text` contains `string`.
 * Comparison is case-insensitive.
 */
function caseInsensitiveContains(text, string) {
  if (text.toLowerCase().indexOf(string.toLowerCase()) !== -1) {
    return true;
  } else {
    return false;
  }
}

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
