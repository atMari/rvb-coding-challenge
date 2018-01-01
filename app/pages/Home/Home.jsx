import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// Local Deps:
import './Home.scss';
import cms from '../../config/messages';
import guitarImage from '../../assets/png/guitar.png';

const HomePage = () => (
  <div className="rvb-home-page">
    <div className="rvb-home-page__content">
      {/* <!--HOME PAGE PROMO MATERIAL HERE--> */}
      <div className="rvb-home-page__promo">
        <img role="presentation" src={guitarImage} />
        <div className="rvb-home-page__text">
          {cms['home.promo.text']}
        </div>
      </div>
    </div>
  </div>
);

HomePage.propTypes = {
  actions: PropTypes.object
};

const mapStateToProps = (/* state */) => ({

});

export default connect(
  mapStateToProps,
)(HomePage);
