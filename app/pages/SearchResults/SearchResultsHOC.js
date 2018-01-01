import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Local Deps
import {
        defaultPaginationPage,
        defaultPaginationCountPerPage,
        defaultPaginationPageRange
      } from '../../config/properties';
// Actions
import { getSearchResults } from '../../globalActions/listings';
// Utils
import { forwardToSearchResultsPage } from '../../utils/browserHistoryUtils';

export default function SearchResultsHOC(SearchResultsPage) {
  class WrappedSearchComponent extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
      results: PropTypes.array.isRequired,
      resultsCount: PropTypes.number.isRequired,
      isFetchingResults: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    static _configurePagination(query, totalItemsCount, onPaginationPageChange) {
      const { page } = query;
      return {
        onPaginationPageChange,
        totalItemsCount,
        activePage: parseFloat(page) || defaultPaginationPage,
        itemsCountPerPage: defaultPaginationCountPerPage,
        pageRangeDisplayed: defaultPaginationPageRange
      };
    }

    componentDidMount() {
      const {
        dispatch,
        location: { query }
      } = this.props;
      // Fetch Search Results
      dispatch(getSearchResults(query));
    }

    componentWillReceiveProps(nextProps) {
      const {
        dispatch,
        location: {
          query: {
            page,
            query,
            category
          }
        }
      } = this.props;
      if (nextProps.location.query.page !== page ||
          nextProps.location.query.query !== query ||
          nextProps.location.query.category !== category) {
        dispatch(getSearchResults(nextProps.location.query));
      }
    }

    _onPaginationPageChange = (pageNumber) => {
      const { location: { query } } = this.props;
      const newQueryObject = {
        ...query,
        page: pageNumber
      };
      return forwardToSearchResultsPage(newQueryObject);
    }

    // Render
    render() {
      const {
        _configurePagination
      } = WrappedSearchComponent;
      const {
        location: { query },
        results,
        resultsCount,
        isFetchingResults
      } = this.props;

      // Pagination
      const pagination = _configurePagination(
        query,
        resultsCount,
        this._onPaginationPageChange
      );
      // Search Results Config:
      const config = {
        results,
        isFetchingResults,
        pagination,
      };
      return <SearchResultsPage {...config} />;
    }
  }

  function mapStateToProps(state) {
    const {
      searchResults
    } = state;
    return {
      ...searchResults
    };
  }

  return connect(mapStateToProps)(WrappedSearchComponent);
}
