/* eslint-disable import/no-unresolved */
import React from 'react';
import App from '/imports/ui/components/app.jsx';
import { TreeNodes } from '/imports/api/TreeNode/collection.js';

const AppContainer = () => (
    <App collection={TreeNodes} />
);

export default AppContainer;
