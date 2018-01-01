import { expect } from 'chai';
import { parseCategoriesFromSearchText } from './searchUtils';
import searchCategories from '../constants/searchCategories';

describe('Search Utils', () => {
  describe('parseCategoriesFromSearchText', () => {
    // Initialize
    const TEST_STRING_1 = 'guitar';
    const TEST_STRING_2 = 'guitars';
    const TEST_STRING_3 = 'electric';
    const TEST_STRING_4 = 'mari';
    const TEST_STRING_5 = 'band';
    const TEST_STRING_6 = 'GUITar';

    it('should return an array', () => {
      const matches1 = parseCategoriesFromSearchText(TEST_STRING_1);
      const matches2 = parseCategoriesFromSearchText(TEST_STRING_2);
      const matches3 = parseCategoriesFromSearchText(TEST_STRING_3);
      const matches4 = parseCategoriesFromSearchText(TEST_STRING_4);
      const matches5 = parseCategoriesFromSearchText(TEST_STRING_5);
      expect(matches1).to.be.an('array');
      expect(matches2).to.be.an('array');
      expect(matches3).to.be.an('array');
      expect(matches4).to.be.an('array');
      expect(matches5).to.be.an('array');
    });

    it('should find category with partial string match', () => {
      const matches1 = parseCategoriesFromSearchText(TEST_STRING_1);
      const matches2 = parseCategoriesFromSearchText(TEST_STRING_2);
      const matches3 = parseCategoriesFromSearchText(TEST_STRING_3);
      expect(matches1).to.include.members([
        searchCategories.electricGuitars,
        searchCategories.acousticGuitars,
        searchCategories.bassGuitars
      ]);
      expect(matches1).to.have.lengthOf(3);
      expect(matches2).to.include.members([
        searchCategories.electricGuitars,
        searchCategories.acousticGuitars,
        searchCategories.bassGuitars
      ]);
      expect(matches1).to.have.lengthOf(3);
      expect(matches3).to.include.members([
        searchCategories.electricGuitars,
        searchCategories.electricPianos,
        searchCategories.electricKeyboards
      ]);
      expect(matches1).to.have.lengthOf(3);
    });

    it('will not break if a category is not found', () => {
      const matches4 = parseCategoriesFromSearchText(TEST_STRING_4);
      expect(matches4).to.be.empty; // eslint-disable-line no-unused-expressions
    });

    it('should be case insensitive', () => {
      const matches6 = parseCategoriesFromSearchText(TEST_STRING_6);
      expect(matches6).to.include.members([
        searchCategories.electricGuitars,
        searchCategories.acousticGuitars,
        searchCategories.bassGuitars
      ]);
      expect(matches6).to.be.an('array');
      expect(matches6).to.have.lengthOf(3);
    });

    it('should not break if no search text is passed in', () => {
      const matches6 = parseCategoriesFromSearchText();
      expect(matches6).to.be.an('array');
      expect(matches6).to.be.empty; // eslint-disable-line no-unused-expressions
    });
  });
});
