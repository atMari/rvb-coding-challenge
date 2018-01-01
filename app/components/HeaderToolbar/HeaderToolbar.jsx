// Global Deps
import React from 'react';
import { Navbar } from 'react-bootstrap';
// Local Deps
import './HeaderToolbar.scss';
import { appName } from '../../config/properties';
import { forwardToHomePage } from '../../utils/browserHistoryUtils';

const HeaderToolbar = () => (
  <Navbar inverse collapseOnSelect className="rvb-header-toolbar">
    <Navbar.Header>
      <Navbar.Brand>
        <div className="rvb-header-toolbar__brand-text" onClick={forwardToHomePage}>
          {appName}
        </div>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

HeaderToolbar.propTypes = {};

export default HeaderToolbar;
