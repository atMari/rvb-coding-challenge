// Global Deps
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Local Deps
import SearchForm from '../SearchForm/SearchForm';
// Actions:
import {
        submitSearchForm,
        updateSearchBar
      } from './redux/actions';

class SearchBar extends Component {

  static propTypes = {
    searchBarText: PropTypes.string,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static _onSubmit(formValues, formDispatch, formProps) {
    const { initialValues } = formProps;
    return formDispatch(
      submitSearchForm({
        formValues,
        initialValues
      })
    );
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

  render() {
    const {
      _renderSearchForm,
      _onSubmit
    } = SearchBar;
    const {
      searchBarText,
    } = this.props;

    return (
      <div className="rvb-search-bar">
        {_renderSearchForm({
          searchBarText,
          onSubmit: _onSubmit
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => search;

export default connect(mapStateToProps)(SearchBar);
