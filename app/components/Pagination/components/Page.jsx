import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Page extends Component {
    static propTypes = {
      pageText: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element,
          PropTypes.number
      ]),
      pageNumber: PropTypes.number.isRequired,
      onClick: PropTypes.func.isRequired,
      isActive: PropTypes.bool.isRequired,
      className: PropTypes.string
    }

    static defaultProps = {
      isActive: false,
    }

    handleClick(e) {
      const { pageNumber, onClick } = this.props;
      e.preventDefault();
      onClick(pageNumber);
    }

    render() {
      const {
        pageText,
        isActive,
        className
      } = this.props;

      const stateCss = cx({
        'rvb-page--active': isActive,
      });

      return (
        <button className={`rvb-page ${className} ${stateCss}`}
            onClick={::this.handleClick}>
          { pageText }
        </button>
      );
    }
}
