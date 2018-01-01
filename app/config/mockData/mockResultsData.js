import range from 'ramda/src/range';

function createMockResultsData(resultsCount) {
  const resultsArray = range(1, resultsCount);
  const results = resultsArray.map(count => ({
    index: count,
    text: 'Search Result Number: '
  }));
  return {
    results,
    totalCount: results.length
  };
}

const NUMBER_OF_MOCK_RESULTS = 140;

export const mockSearchResults = createMockResultsData(NUMBER_OF_MOCK_RESULTS);
