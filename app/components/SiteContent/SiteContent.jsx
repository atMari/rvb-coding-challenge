import React, { PropTypes } from 'react';
// Local Deps:
import HeaderToolbar from '../HeaderToolbar';
import SearchBar from '../SearchBar';

const SiteContent = ({ children, location }) => (
  <div className="rvb-site-content">
    {/* <!--HEADER TOOLBAR --> */}
    <HeaderToolbar />
    {/* <!--SEARCH BAR --> */}
    <SearchBar location={location} />
    {/* <!--CONTENT --> */}
    {children}
  </div>
);

SiteContent.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default SiteContent;
