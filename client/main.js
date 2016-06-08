/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '/imports/startup/client/routes.jsx';
import { TreeNodes } from '/imports/api/TreeNode/collection.js';
import { createTree } from '/imports/api/TreeNode/utils.js';

Meteor.startup(() => {
    const tree = [];
    if (!TreeNodes.find({ treeId: 'testTree' }).count()) {
        createTree('testTree', 3, 2, tree);
        tree.forEach(node => TreeNodes.insert(node));
    }
    render(renderRoutes(), document.getElementById('app'));
});
