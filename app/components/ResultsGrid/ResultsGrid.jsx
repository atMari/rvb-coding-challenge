import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
// Local Deps:

class ResultsGrid extends Component {

  static propTypes= {
    results: PropTypes.array.isRequired
  }

  static _generateResults(results) {
    if (isEmpty(results)) return;
    return results.map((result, idx) => (
      <div className="rvb-results-grid__result"
           key={idx}>
        <div className="rvb-results-grid__result-text">
          {`${result.text} ${result.index}`}
        </div>
      </div>
    ));
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
