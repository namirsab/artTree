/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './imports/components/app.jsx';
import { TreeNodes } from '/imports/TreeNode/collection.js';
import { createTree } from '/imports/TreeNode/utils.js';

Meteor.startup(() => {
    const tree = [];
    if (!TreeNodes.find({ treeId: 'testTree' }).count()) {
        createTree('testTree', 3, 2, tree);
        tree.forEach(node => TreeNodes.insert(node));
    }


    render(<App collection={TreeNodes} />, document.getElementById('app'));
});
