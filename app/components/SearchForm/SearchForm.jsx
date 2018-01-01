// Global Deps
import { Row, Col, InputGroup, Button } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FontAwesome from 'react-fontawesome';
// Local Deps
import './SearchForm.scss';
import cms from '../../config/messages';

class SearchForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired, // provided by ReduxForm
  }

  _onSubmit = (formValues, formDispatch, formProps) => {
    const { onSubmit } = this.props;
    return onSubmit(formValues, formDispatch, formProps);
  }

  render() {
    const {
      handleSubmit,
    } = this.props;
    return (
      <form className="rvb-search-form" onSubmit={handleSubmit(this._onSubmit)}>
        <Row className="rvb-row">
          <Col className="rvb-column" xs={6} xsOffset={3}>
            <div className="rvb-search-form__input-group">
              {/* <!--SEARCH INPUT--> */}
              <Field className="rvb-search-form__field"
                     name="searchBarText"
                     component="input"
                     placeholder={cms['searchForm.searchbar.placeholder']} />
              {/* <!--SUBMIT BUTTON--> */}
              <InputGroup.Button className="rvb-search-form__button-group">
                <Button className="rvb-search-form__button--submit"
                        type="submit">
                  <FontAwesome name="search" className="rvb-search-form__icon" />
                </Button>
              </InputGroup.Button>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'searchForm', // unique form name
  enableReinitialize: true,
})(SearchForm);
