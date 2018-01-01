import isEmpty from 'lodash/isEmpty';

export function createWordBoundaryRegex(str) {
  return new RegExp(`\\b${str}|${str}s\\b`);
}

export function testArrayForMatchingString(stringArray, stringToMatch) {
  if (isEmpty(stringArray) || !stringToMatch) return [];
  // Dynamically create new regex:
  const rgx = createWordBoundaryRegex(stringToMatch);
  // Search for matches:
  let isMatch;
  const matches = stringArray.reduce((matchesFound, str) => {
    isMatch = str.match(rgx);
    if (!isMatch) return matchesFound;
    return [...matchesFound, str];
  }, []);
  return matches;
}
