import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
// Local Deps:
import './ResultsGrid.scss';
import defaultImg from '../../assets/png/default.png';

class ResultsGrid extends Component {

  static propTypes= {
    results: PropTypes.array.isRequired
  }

  static _generateResults(results) {
    if (isEmpty(results)) return;
    return results.map((result, idx) => {
      const imgUrl = get(result, 'photos[0]._links.thumbnail.href', defaultImg);
      return (
        <div className="rvb-results-grid__result"
             key={idx}>
          <div className="rvb-results-grid__result-img">
            <img role="presentation" src={imgUrl} />
          </div>
          <div className="rvb-results-grid__result-text">
            {`${result.title}`}
          </div>
        </div>
      );
    });
  }

  render() {
    const { results } = this.props;
    const { _generateResults } = ResultsGrid;
    return (
      <div className="rvb-results-grid">
        {_generateResults(results)}
      </div>
    );
  }
}

export default ResultsGrid;
