/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './imports/components/app.jsx';

Meteor.startup(() => {
    render(<App />, document.getElementById('app'));
});
