import React, { Component } from 'react';
import PropTypes from 'prop-types';
import range from 'ramda/src/range';
// Local Deps
import './Pagination.scss';
import {
        defaultPaginationPage,
        defaultPaginationPageRange,
        defaultPaginationCountPerPage
      } from '../../config/properties';
import cms from '../../config/messages';
// Utils
import { paginate } from '../../utils/paginationUtils';
// Components
import Page from './components/Page';

export default class Pagination extends Component {
  static propTypes = {
    totalItemsCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
  }

  static defaultProps = {
    itemsCountPerPage: parseFloat(defaultPaginationCountPerPage),
    pageRangeDisplayed: parseFloat(defaultPaginationPageRange),
    activePage: parseFloat(defaultPaginationPage),
  }

  static _generatePages({
    itemsCountPerPage,
    pageRangeDisplayed,
    activePage,
    totalItemsCount,
    onChange
  }) {
    let allPages = [];

    const paginationInfo = paginate({
      itemsCountPerPage,
      pageRangeDisplayed,
      totalItemsCount,
      activePage
    });

    // If there is only one page worth of pages, return nothing
    if (paginationInfo.firstPage === paginationInfo.lastPage) {
      return;
    }

    allPages = range(paginationInfo.firstPage, (paginationInfo.lastPage + 1)).map((page, idx) => (
      <Page
        className={`rvb-page--${idx}`}
        isActive={page === activePage}
        key={idx}
        pageNumber={page}
        pageText={page}
        onClick={onChange}
      />
    ));

    // Render Previous Button if found
    if (paginationInfo.hasPreviousPage) {
      const previousPage = (
        <Page
          className="rvb-page--prev"
          key="previousPage"
          pageNumber={paginationInfo.previousPage}
          onClick={onChange}
          pageText={cms['pagination.previousPage']}
        />
      );
      allPages = [previousPage, ...allPages];
    }

    // Render Next Button if found
    if (paginationInfo.hasNextPage) {
      const nextPage = (
        <Page
          className="rvb-page--next"
          key="nextPage"
          pageNumber={paginationInfo.nextPage}
          onClick={onChange}
          pageText={cms['pagination.nextPage']}
        />
      );
      allPages = [...allPages, nextPage];
    }

    return allPages;
  }

  render() {
    const { _generatePages } = Pagination;
    const {
      itemsCountPerPage,
      pageRangeDisplayed,
      activePage,
      totalItemsCount,
      onChange,
    } = this.props;
    return (
      <div className="rvb-pagination">
        { _generatePages({
            itemsCountPerPage,
            pageRangeDisplayed,
            activePage,
            totalItemsCount,
            onChange
        })}
      </div>
    );
  }
}
