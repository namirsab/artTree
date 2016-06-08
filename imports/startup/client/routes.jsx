/* eslint-disable import/no-unresolved */
import React from 'react';
import AppContainer from '/imports/ui/components/AppContainer.jsx';
import { Router, Route, browserHistory } from 'react-router';

// Define route components
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer} />
    </Router>
);
