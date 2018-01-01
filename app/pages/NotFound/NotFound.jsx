import React from 'react';
// Local Deps:
import './NotFound.scss';
import { forwardToHomePage } from '../../utils/browserHistoryUtils';
import cms from '../../config/messages';
import Loading from '../../components/Loading/Loading';

const NotFound = () => (
  <div className="rvb-not-found">
    <h2 className="rvb-not-found__header">
      {cms['notFound.title']}
    </h2>
    <button className="rvb-not-found__button rvb-button"
           onClick={() => { forwardToHomePage(); }}>
      {cms['notFound.button.text']}
    </button>
    <Loading />
  </div>
);

export default NotFound;
