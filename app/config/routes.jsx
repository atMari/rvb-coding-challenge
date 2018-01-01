// Global Deps
import React from 'react';
import { Route, Redirect } from 'react-router';
// Local Deps
import {
        home,
        searchResults,
        notFound,
      } from '../constants/routes';
// JSX
import SiteContent from '../components/SiteContent/SiteContent';
import HomePage from '../pages/Home/Home';
import NotFoundPage from '../pages/NotFound/NotFound';
import SearchResultsPage from '../pages/SearchResults/SearchResults';

export default (
  <Route>
    <Route component={SiteContent}>
      <Route path={home} component={HomePage} />
      <Route path={searchResults} component={SearchResultsPage} />
    </Route>
    <Route path={notFound} component={NotFoundPage} />
    <Redirect from="/" to={home} />
    <Redirect from="*" to={notFound} />
  </Route>
);
