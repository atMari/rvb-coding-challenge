// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Local Deps
import SearchForm from '../SearchForm/SearchForm';
// Actions:
import { updateSearchBar } from './redux/actions';
import { getCategories } from '../../globalActions/categories';
// Utils:
import { submitSearchForm } from '../../utils/searchUtils';

class SearchBar extends Component {

  static propTypes = {
    searchBarText: PropTypes.string,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    availableCategories: PropTypes.array.isRequired,
    isFetchingCategories: PropTypes.bool.isRequired
  }

  static _renderSearchForm({
    searchBarText,
    onSubmit
  }) {
    const initialValues = {
      searchBarText
    };
    const config = {
      initialValues,
      onSubmit
    };
    return (
      <SearchForm {...config} />
    );
  }

  componentDidMount() {
    const {
      dispatch,
      location
    } = this.props;
    dispatch(getCategories());
    dispatch(updateSearchBar(location.query.query));
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      location: {
        query: { query }
      }
    } = this.props;
    if (query !== nextProps.location.query.query) {
      dispatch(updateSearchBar(nextProps.location.query.query));
    }
  }

  _onSubmit = (formValues, formDispatch, formProps) => {
    const {
      initialValues,
    } = formProps;
    const { availableCategories } = this.props;
    submitSearchForm({
      formValues,
      initialValues,
      availableCategories
    });
  }

  render() {
    const { _renderSearchForm } = SearchBar;
    const {
      searchBarText,
      isFetchingCategories,
    } = this.props;

    return (
      <div className="rvb-search-bar">
        {!isFetchingCategories && _renderSearchForm({
          searchBarText,
          onSubmit: this._onSubmit
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => search;

export default connect(mapStateToProps)(SearchBar);
