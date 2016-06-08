/* eslint-disable import/no-unresolved */
import { _ } from 'meteor/underscore';
// Utility function to create a tree
const createTree = (treeId, levels, childrenPerNode, outTree) => {
    if (outTree.length === 0) {
        // Add root
        const root = {
            _id: 'root',
            treeId,
            content: 'root',
            treeLabel: 'root',
            level: 0,
            label: 'root',
            parent: null,
        };
        outTree.push(root);
    }

    if (levels > 0) {
        const parent = _(outTree).last();
        const children = _(childrenPerNode).times(i => {
            const child = {
                _id: parent._id + i,
                content: parent._id + i,
                treeId,
                level: parent.level + 1,
                label: parent._id + i,
                parent: parent._id,
            };
            outTree.push(child);
            createTree(treeId, levels - 1, childrenPerNode, outTree);
            return child;
        });
        parent.children = children.map(child => child._id);
    }
};

export {
    createTree,
};
