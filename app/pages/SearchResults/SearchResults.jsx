// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Local Deps
import './SearchResults.scss';
// HOC
import SearchResultsHOC from './SearchResultsHOC';
// Components
import ResultsGrid from '../../components/ResultsGrid';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

class SearchResultsPage extends Component {

  static propTypes = {
    results: PropTypes.array.isRequired,
    isFetchingResults: PropTypes.bool.isRequired,
    pagination: PropTypes.shape({
      onPaginationPageChange: PropTypes.func.isRequired,
      totalItemsCount: PropTypes.number.isRequired,
      activePage: PropTypes.number.isRequired,
      itemsCountPerPage: PropTypes.number.isRequired,
      pageRangeDisplayed: PropTypes.number.isRequired
    }).isRequired
  }

  static _generatePagination({
    totalItemsCount,
    onChange,
    activePage,
    itemsCountPerPage,
    pageRangeDisplayed
  }) {
    const config = {
      totalItemsCount,
      onChange,
      activePage,
      itemsCountPerPage,
      pageRangeDisplayed
    };
    return (
      <Pagination {...config} />
    );
  }

  render() {
  const {
    _generatePagination,
  } = SearchResultsPage;
    const {
      results,
      isFetchingResults,
      pagination: {
        totalItemsCount,
        onPaginationPageChange,
        activePage,
        itemsCountPerPage,
        pageRangeDisplayed
      }
    } = this.props;
    return (
      <div className="rvb-search-results">
        <div className="rvb-search-results__content">
          {/* <!-- LOADING TREATMENT -->*/}
          { isFetchingResults && <Loading />}
          {/* <!-- RESULTS GRID -->*/}
          {!isFetchingResults && <ResultsGrid results={results} />}
          {/* <!-- PAGINATION -->*/}
          {_generatePagination({
            totalItemsCount,
            onChange: onPaginationPageChange,
            activePage,
            itemsCountPerPage,
            pageRangeDisplayed
          })}
        </div>
      </div>
    );
  }
}


export default SearchResultsHOC(SearchResultsPage);
