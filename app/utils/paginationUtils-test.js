import { expect } from 'chai';
import { paginate } from '../utils/paginationUtils';

describe('Pagination Utils', () => {
  describe('paginate', () => {
    // Initialize
    const ITEMS_COUNT_1 = 140;
    const ITEMS_COUNT_2 = 7;

    it('should return configured number of items per page', () => {
      const pagination = paginate({
        totalItemsCount: ITEMS_COUNT_1,
        activePage: 9
      });
      expect(pagination).to.deep.equal({
        lastPage: 10,
        firstPage: 1,
        hasPreviousPage: true,
        hasNextPage: true,
        nextPage: 10,
        previousPage: 8
      });
    });

    it('should default active page to the first page', () => {
      const pagination = paginate({ totalItemsCount: ITEMS_COUNT_1 });
        expect(pagination).to.deep.equal({
          lastPage: 10,
          firstPage: 1,
          hasPreviousPage: false,
          hasNextPage: true,
          nextPage: 2,
          previousPage: null
        });
    });

    it('should not return next button if on last page', () => {
      const pagination = paginate({
        totalItemsCount: ITEMS_COUNT_1,
        activePage: 14
      });
      expect(pagination).to.deep.equal({
        lastPage: 14,
        firstPage: 11,
        hasPreviousPage: true,
        hasNextPage: false,
        nextPage: null,
        previousPage: 13
      });
    });

    it('should not break if only enough results for one page', () => {
      const pagination = paginate({
        totalItemsCount: ITEMS_COUNT_2,
      });
      expect(pagination).to.deep.equal({
        lastPage: 1,
        firstPage: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        nextPage: null,
        previousPage: null
      });
    });

    it('should not break if no params are passed in', () => {
      const pagination = paginate({});
      expect(pagination).to.deep.equal({
        lastPage: 1,
        firstPage: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        nextPage: null,
        previousPage: null
      });
    });
  });
});
