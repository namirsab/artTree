/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { TreeNodes } from '/imports/TreeNode/collection.js';

const allNodesForTree = function allNodesForTree(treeId) {
    return TreeNodes.find({ treeId });
};

Meteor.publish('TreeNodes.allForTree', allNodesForTree);
