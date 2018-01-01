import React from 'react';
import PropTypes from 'prop-types';
// Local Deps:
import HeaderToolbar from '../HeaderToolbar';
import SearchBar from '../SearchBar';
// Actions:

const SiteContent = ({
  children,
  location
}) => (
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
  children: PropTypes.any,
  location: PropTypes.object.isRequired
};

export default SiteContent;
