/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { TreeNodes } from '/imports/api/TreeNode/collection.js';

Meteor.startup(() => {
    TreeNodes.remove({});
});

export {
    TreeNodes,
};
