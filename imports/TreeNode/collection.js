/* eslint-disable import/no-unresolved */
import { Mongo } from 'meteor/mongo';
/*
{
    _id: 'aNode',
    treeId: 'aTree',
    parent: null || id,
    children: null || [id],
    content: [miscelannea]
}
*/
class TreeNodeCollection extends Mongo.Collection {
    // Traverse till root from node
    getRoot(treeId) {
        return this.findOne({
            treeId,
            parent: null,
        });
    }
    getContentFromRootTo(treeId, nodeId) {
        return this.getNodesFromRootTo(treeId, nodeId)
            .map(node => node.content);
    }

    getNodesFromRootTo(treeId, nodeId) {
        if (nodeId) {
            const node = this.findOne({
                treeId,
                _id: nodeId,
            });
            if (node) {
                return [...this.getNodesFromRootTo(treeId, node.parent), node];
            }
        }
        // Default return
        return [];
    }
}

const TreeNodes = new TreeNodeCollection('tree_nodes');

export {
    TreeNodes,
};
